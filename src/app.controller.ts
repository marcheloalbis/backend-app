import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { MailerService } from './mailer/mailer.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from './common/decorators/user.decorator';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailerService: MailerService,
  ) {}

  @Get('status')
  @ApiOperation({ summary: 'Estado general del backend' })
  getStatus() {
    return this.appService.getStatus();
  }

  @Get('email-test')
  @ApiOperation({ summary: 'Prueba simple de envío de correo' })
  @ApiQuery({ name: 'to', required: true, description: 'Correo destino' })
  async sendTestEmail(@Query('to') to: string): Promise<{ message: string }> {
    const name = 'Tester';
    const activationLink = 'https://backend-app.dev/activate/test-token';

    await this.mailerService.sendEmail(to, 'Prueba de Correo', 'email-test', {
      name,
      activationLink,
      year: new Date().getFullYear(),
    });

    return {
      message: `📩 Correo de prueba enviado a ${to}`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  @ApiOperation({ summary: 'Verifica quién eres a través del token' })
  getUser(@User() user: { userId: number; email?: string }) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }

  @Get('throw-error')
  @ApiOperation({ summary: 'Simula un error para probar los logs y filtros' })
  throwFakeError(): never {
    throw new Error('💥 Error forzado para pruebas');
  }
}
