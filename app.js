const express = require('express');
const app = express();
const helmet = require('helmet');
// const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cron = require('node-cron');



dotenv.config({ path: path.resolve(__dirname, './config.env') });

require('./db/connection');

const updateContestData = require('./scrapper/scheduler');

cron.schedule('*/5 * * * *', () => {
    updateContestData();
})

const Contest = require('./model/contestSchema');


const PORT = process.env.PORT || 5000;

// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200
// }

app.use(express.json());
app.use(helmet());
// app.use(cors());
// app.options('*', cors());


// if (process.env.NODE_ENV = "production") {
//     app.use(express.static("client/build"));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

app.get('/getContestData', async (req, res) => {

    try {
        const response = await Contest.find();
        console.log('Data fetched sucessfully');
        return res.status(200).json({ "status": 200, "contests": response })

    } catch (err) {
        return res.status(err.code).json({ "error": err.message });
    }

})



app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
})

