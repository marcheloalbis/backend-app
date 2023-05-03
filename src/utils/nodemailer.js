const ejs = require('ejs');
const path = require('path');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  //service: gmail
  port: 587,
  //secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to, subject, templateName, variables) {
  try {
    console.log('=============Z',process.env.EMAIL_USER,process.env.EMAIL_PASS )
    const templatePath = path.join(__dirname, '../','views', 'email-templates', `${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, variables);
    const info = await transporter.sendMail({
      from:  process.env.EMAIL_USER,
      to,
      subject,
      html
    });
    console.log(`Correo electrónico enviado a ${to}: ${info.messageId}`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { sendEmail };