const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cron = require('node-cron');
const ipInfo = require("ipinfo");
const { getClientIp } = require("@supercharge/request-ip");



dotenv.config({ path: path.resolve(__dirname, './config.env') });

require('./db/connection');

const updateContestData = require('./scrapper/scheduler');

cron.schedule('*/15 * * * *', () => {
    updateContestData();
})

const Contest = require('./model/contestSchema');


const PORT = process.env.PORT || 5000;

var corsOptions = {
    origin: ['https://cpcalendar.netlify.app', 'http://localhost:3000'],
    optionsSuccessStatus: 200
}


//Middlewares
app.use(helmet());
app.use(cors(corsOptions));



app.get('/getContestData', async (req, res) => {

    try {
        const user_ip = getClientIp(req);
        const location = await ipInfo(user_ip);
        const response = await Contest.find();
        console.log('Data fetched sucessfully');

        return res.status(200).json({
            "status": 200,
            "total_contests": response.length,
            "contests": response,
            "user_data" : location
        })

    } catch (err) {
        return res.status(err.code).json({ "error": err.message });
    }

})

app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
})

