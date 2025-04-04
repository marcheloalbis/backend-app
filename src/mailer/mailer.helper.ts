/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as hbs from 'hbs';
import * as dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  templateName: string,
  variables: Record<string, any>,
): Promise<void> {
  try {

    // Detectar si estamos en desarrollo
    const isDev = process.env.NODE_ENV !== 'production';

    const baseDir = isDev
      ? path.join(process.cwd(), 'src', 'mailer', 'templates')
      : path.join(process.cwd(), 'dist', 'mailer', 'templates');

    const templatePath = path.join(baseDir, `${templateName}.hbs`);
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const compiled = hbs.compile(templateContent);
    const html = compiled(variables);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log(`📬 Correo enviado a ${to}: ${info.messageId}`);
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
  }
}
