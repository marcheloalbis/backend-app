import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { sendEmail } from 'src/mailer/mailer.helper';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private readonly jwtSecret = process.env.JWT_SECRET;

  private ensureJwtSecret() {
    if (!this.jwtSecret) {
      throw new Error('JWT_SECRET no definido en el archivo .env');
    }
    return this.jwtSecret;
  }

  async register(data: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          active: false,
        },
      });

      const token = jwt.sign({ userId: user.id }, this.ensureJwtSecret(), {
        expiresIn: '1d',
      });

      const activationLink = `http://localhost:3000/auth/activate-account/${token}`;

      const variables = {
        name: user.name,
        activationLink,
      };

      await sendEmail(
        user.email,
        'Activa tu cuenta',
        'activate-account',
        variables,
      );
    });

    return {
      message:
        'Usuario registrado exitosamente. Revisa tu correo para activar la cuenta.',
    };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign({ userId: user.id }, this.ensureJwtSecret(), {
      expiresIn: '1d',
    });

    return { token };
  }

  async activateAccount(token: string) {
    const decoded = jwt.verify(token, this.ensureJwtSecret()) as {
      userId: string;
    };

    const userId = parseInt(decoded.userId, 10);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (user.active) {
      return { message: 'La cuenta ya fue activada anteriormente' };
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { active: true },
    });

    const variables = { name: updatedUser.name };
    await sendEmail(
      updatedUser.email,
      'Cuenta Activada',
      'account-activated',
      variables,
    );

    return { message: 'Cuenta activada correctamente' };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const token = jwt.sign({ userId: user.id }, this.ensureJwtSecret(), {
      expiresIn: '30m',
    });

    const resetUrl = `http://localhost:3000/auth/reset-password-current/${token}`;

    const variables = {
      name: user.name,
      resetUrl,
    };

    await sendEmail(
      user.email,
      'Restablecer contraseña',
      'reset-password',
      variables,
    );

    return { message: 'Correo de restablecimiento enviado' };
  }

  async resetPasswordWithoutCurrent(token: string, password: string) {
    const decoded = jwt.verify(token, this.ensureJwtSecret()) as {
      userId: number;
    };

    const user = await this.prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new Error('Token inválido o usuario no encontrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    const newToken = jwt.sign({ userId: user.id }, this.ensureJwtSecret(), {
      expiresIn: '1d',
    });

    return { token: newToken, message: 'Contraseña actualizada correctamente' };
  }
}
