import { ForgotPasswordDto } from './dto/forgot-password.dto';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('activate-account/:token')
  @ApiOperation({
    summary:
      'Activa la cuenta del usuario mediante el token enviado por correo',
  })
  @ApiParam({
    name: 'token',
    description: 'Token JWT enviado al correo del usuario',
  })
  async activate(@Param('token') token: string) {
    return this.authService.activateAccount(token);
  }

  @Post('forgot-password')
  @ApiBody({ type: ForgotPasswordDto })
  @ApiOperation({ summary: 'Enviar correo de recuperación de contraseña' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password-current')
  @ApiOperation({ summary: 'Restablecer contraseña sin la anterior' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPasswordWithoutCurrent(
      dto.token,
      dto.password,
    );
  }
}
