import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TestService } from './test/test.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService,
  ) {}

  @Get()
  getHello(): string {
   // this.testService.testLog(); // Aquí se dispara el log
    return 'Hello World!';
  }

  @Get('error')
  throwError(): string {
    throw new Error('Este es un error forzado 🧨');
  }
}
