const hbs = require('hbs');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

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
    const templatePath = path.join(__dirname, '../', 'views', 'email-templates', `${templateName}.hbs`);
    const template = hbs.compile(fs.readFileSync(templatePath, 'utf8'));
    const html = template(variables);
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