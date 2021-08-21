const nodemailer = require('nodemailer');
const Email = require('email-templates');

const transporter = nodemailer.createTransport({
  service : 'gmail',
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

email.send({
  template: 'contest',
  message: {
    to: ['hopeplasmaofficial@gmail.com'],
  },
}).then(() => console.log('email has been sent!'));