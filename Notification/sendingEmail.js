/**
 * this file will contain the sample logic to send the email
 */

const nodemailer = require('nodemailer');

/**
 * we need to configure the transporter for sending email
 *
 */
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'krksingh.99@gmail.com',
    pass: 'kkq7378383jxyhdhdjxv',
  },
  secure: true,
});

/**
 * write the code to send the email
 *
 */
const mailObj = {
  from: 'crm-no-reply@gmail.com',
  to: 'krshanu.95@gmail.com',
  subject: 'Testing code - for  sending email',
  text: 'Sample text content of the email',
};
transporter.sendMail(mailObj, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Email was send successfully');
  }
});
