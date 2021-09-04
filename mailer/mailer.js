const nodemailer = require('nodemailer');
const Email = require('email-templates');
const today_contest = require('./todayContest')

const notification_mailer = () => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port : 587,
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
      console.log("Sending Emails..........")
      email.send({
        template: 'contest',
        message: {
          bcc : ['hopeplasmaofficial@gmail.com']
        },
       locals : {
          contests : res, 
      }
      }).then(() => console.log('Emails has been sent!'));
    }
  }).catch(err => console.log(err.message))

}

module.exports = notification_mailer;

