import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class TestService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {}

  testLog() {
    this.logger.info('🟢 Esto va al archivo reporter.log');
    this.logger.warn('🟡 Advertencia logueada');
    this.logger.error('🔴 Error logueado');
  }
}
