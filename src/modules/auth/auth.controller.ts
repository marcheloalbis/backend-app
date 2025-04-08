import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { MailerService } from '../mailer/mailer.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({ type: RegisterDto })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('activate-account/:token')
  @ApiOperation({
    summary: 'Activar cuenta a través del enlace enviado por correo',
  })
  @ApiParam({
    name: 'token',
    description: 'Token JWT enviado por correo electrónico',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  activate(@Param('token') token: string) {
    return this.authService.activateAccount(token);
  }

  @Post('forgot-password')
  @ApiOperation({
    summary: 'Solicitar restablecimiento de contraseña por correo',
  })
  @ApiBody({ type: ForgotPasswordDto })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password-current')
  @ApiOperation({
    summary: 'Restablecer contraseña sin la contraseña actual (por token)',
  })
  @ApiBody({ type: ResetPasswordDto })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPasswordWithoutCurrent(
      dto.token,
      dto.password,
    );
  }

  @Post('reset-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Cambiar contraseña actual (requiere estar logueado)',
  })
  @ApiBody({ type: ChangePasswordDto })
  resetPasswordWithCurrent(
    @User('userId') userId: number,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.resetPasswordWithCurrent(
      userId,
      dto.oldPassword,
      dto.newPassword,
    );
  }
}
