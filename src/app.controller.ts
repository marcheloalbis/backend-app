/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TestService } from './test/test.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { sendEmail } from './mailer/mailer.helper'; // ⬅️ IMPORTA TU HELPER

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener saludo de prueba' })
  getHello(): string {
    // this.testService.testLog(); // Aquí se dispara el log
    return 'Hello World!';
  }

  @Get('test')
  @ApiQuery({ name: 'to', required: true })
  async sendTestEmail(@Query('to') to: string) {
    const name = 'Marce Tester 🧪';
    const activationLink = 'https://backend-app.dev/activate/123456';
   /*  await sendEmail(to, 'Activa tu cuenta', 'account-activated', {
      name,
      activationLink,
    }); */
    await sendEmail(to, 'Actasdiva tu cuenta', 'reset-password', {
      name,
      activationLink,
    });
    return {
      message: `Correo enviado correctamente a ${to}`,
    };
  }

  @Get('error')
  throwError(): string {
    throw new Error('Este es un error forzado 🧨');
  }
}
