const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cron = require('node-cron');
const ipInfo = require("ipinfo");
const { getClientIp } = require("@supercharge/request-ip");
const TodayContest = require('./mailer/todayContest');

dotenv.config({ path: path.resolve(__dirname, './config.env') });

require('./db/connection');

const mailer = require("./mailer/mailer");
cron.schedule('35 16 * * *', ()=> {
    console.log("Emails.")
    mailer();
})

const updateContestData = require('./scrapper/scheduler');
cron.schedule('*/60 * * * *', () => {
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
        const todaycontest = await TodayContest();
        var date_temp = new Date();
        console.log()
        console.log('Data fetched sucessfully');
        return res.status(200).json({
            "status": 200,
            "total_contests": response.length,
            "contests_today" : todaycontest.length,
            "contests": response,
            "today_contest" : todaycontest,
            "user_data" : location
        })
    } catch (err) {
        return res.status(err.code).json({ "error": err.message });
    }
})

app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
})