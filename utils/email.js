const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

// Function to send activation email
const sendActivationEmail = (email, token, port, baseURL) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const activationLink = `${baseURL}:${port}/activate/${token}`;

  const mailOptions = {
    from: emailConfig.activationEmail.from,
    to: email,
    subject: emailConfig.activationEmail.subject,
    text: emailConfig.activationEmail.text(activationLink),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendActivationEmail };
