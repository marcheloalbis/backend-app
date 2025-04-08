import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter, SentMessageInfo } from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as hbs from 'hbs';
import { compile as HandlebarsCompile } from 'handlebars';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER ?? '',
      pass: process.env.EMAIL_PASS ?? '',
    },
  });

  private readonly logger = new Logger(MailerService.name);

  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    variables: Record<string, any>,
  ): Promise<void> {
    try {
      const isDev = process.env.NODE_ENV !== 'production';
      const templatesPath = isDev
        ? path.join(process.cwd(), 'src', 'mailer', 'templates')
        : path.join(process.cwd(), 'dist', 'mailer', 'templates');

      const templatePath = path.join(templatesPath, `${templateName}.hbs`);
      const templateContent: string = fs.readFileSync(templatePath, 'utf8');
      const compileTemplate: (vars: Record<string, any>) => string =
        HandlebarsCompile(templateContent);
      const html: string = compileTemplate(variables);

      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER ?? '',
        to,
        subject,
        html,
      }) as SentMessageInfo;

      this.logger.log(`📬 Correo enviado a ${to}: ${info.messageId}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`❌ Error al enviar el correo: ${error.message}`);
      } else {
        this.logger.error('❌ Error desconocido al enviar el correo');
      }
    }
  }
}
