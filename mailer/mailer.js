const nodemailer = require('nodemailer');
const Email = require('email-templates');
const today_contest = require('./todayContest')


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  }
});

const email = new Email({
  transport: transporter,
  send: true,
  preview: true,
});

today_contest().then(res => {
  if (res.length) {
    console.log(res)
    email.send({
      template: 'contest',
      message: {
        to: ['hopeplasmaofficial@gmail.com' ,'vinayaks0031@gmail.com']
      },
     locals : {
        contests : [
          {
          "_id": 5,
          "platform": "Codeforces",
          "hex_color": "#212529",
          "link": "https://codeforces.com/contest/1562",
          "title": "Codeforces Round #741 (Div. 2)",
          "start": "26 Aug 2021",
          "end": "26 Aug 2021",
          "start_time": "8:05 PM",
          "end_time": "10:05 PM",
          "__v": 0
          },
          {
          "_id": 1,
          "platform": "Codechef",
          "title": "August Lunchtime 2021",
          "start": "28 Aug 2021",
          "end": "28 Aug 2021",
          "start_time": "7:30 PM",
          "end_time": "10:30 PM",
          "hex_color": "#A0522D",
          "link": "https://www.codechef.com/LTIME99?itm_campaign=contest_listing",
          "__v": 0
          },
          {
          "_id": 9,
          "platform": "Leetcode",
          "title": "Weekly Contest 256",
          "start": "29 Aug 2021",
          "end": "29 Aug 2021",
          "start_time": "1:30 PM",
          "end_time": "3:00 PM",
          "link": "https://leetcode.com/contest/weekly-contest-256",
          "hex_color": "#edaf05",
          "__v": 0
          }], 
    }
    }).then(() => console.log('email has been sent!'));
  }
}).catch(err => console.log(err.message))

