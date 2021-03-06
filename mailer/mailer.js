const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const Email = require('email-templates');
const today_contest = require('./todayContest')

const notification_mailer = async () => {

  const transporter = nodemailer.createTransport(
     nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API,
    })
  );

  transporter.sendMail({
    from: 'chouhantanish@gmail.com',
    to: 'chouhantanish@gmail.com',
    subject: 'Upcoming Contests',
    html: '<h1>CpCalendar upcoming contests</h1>'
  }).then( res=> console.log("Email has been sent" , res)
  ).catch(err=> console.log(err.message))


  // const email = new Email({
  //   transport: transporter,
  //   send: true,
  //   preview: false,
  // });

  // today_contest().then(res => {
  //   if (res.length) {
  //     console.log("Sending Emails..........")
  //     email.send({
  //       template: 'contest',
  //       message: {
  //         bcc : ['']
  //       },
  //      locals : {
  //         contests : res, 
  //     }
  //     }).then(() => console.log('Emails has been sent!'));
  //   }
  // }).catch(err => console.log(err.message))

}

module.exports = notification_mailer;

