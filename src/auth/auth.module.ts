import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailerModule } from '../mailer/mailer.module';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [
    PrismaModule,
    MailerModule, // ✅ <--- ESTO ES CLAVE
  ],
  providers: [AuthService, JwtStrategy, MailerModule],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
