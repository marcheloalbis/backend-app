import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailerModule } from '../mailer/mailer.module';
import { MailerService } from '../mailer/mailer.service';
import { CoreModule } from 'src/shared/core.module';
@Module({
  imports: [
    CoreModule,           // Prisma, Config, Logger
    MailerModule,
  ],
  providers: [AuthService, JwtStrategy, MailerService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
