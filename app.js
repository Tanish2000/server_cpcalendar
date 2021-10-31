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
const User = require('./model/userSchema');

dotenv.config({ path: path.resolve(__dirname, './config.env') }); //including the .env variables

require('./db/connection'); //making connection with Database


const updateContestData = require('./scrapper/scheduler'); //importing scrapper and scheduler
cron.schedule('*/60 * * * *', () => {
    updateContestData();
})

const Contest = require('./model/contestSchema');
const PORT = process.env.PORT || 5000;
var corsOptions = {  //cors settings
    origin: ['https://cpcalendar.netlify.app', 'http://localhost:3000'],
    optionsSuccessStatus: 200
}

//Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.get('/getContestData', async (req, res) => { //API endpoint to fetch contest data
    try {
        const user_ip = getClientIp(req);
        const location = await ipInfo(user_ip);
        const response = await Contest.find();
        const todaycontest = await TodayContest();
        console.log(`Data fetched sucessfully from ${location.city}`);
        return res.status(200).json({   //returning contests data
            "status": 200,
            "total_contests": response.length,
            "contests_today": todaycontest.length,
            "contests": response,
            "today_contest": todaycontest,
            "user_data": location
        })
    } catch (err) {
        //handling errors
        return res.status(err.code).json({ "error": err.message });
    }
})

app.post('/addUser', async (req, res) => {
    try {
        const { email } = req.body;
        const UserExist =  await User.findOne({ email : email  })
        if(UserExist) // If user already exists
        {
            return res.status(403).json({ status : 403 , message : " 🛑 You are already there!"})
        }
        else { // for new users 
            const new_user = new User({ email })
            const response  = await new_user.save();
            if(response) {
                return res.status(200).json({ status : 200 , message : "🎉 Added! Sit back and Relax."})
            }
            else {
                return res.status(500).json({ status : 500 , message : "Internal Server Error."})
            }            
        }
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ status : 500 , message : "Internal Server Error." })
    }
})

app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
})