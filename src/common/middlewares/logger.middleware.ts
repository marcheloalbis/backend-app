import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private accessLogStream: fs.WriteStream;

  constructor() {
    const logDir = path.join(__dirname, '../../../logs/access');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const date = new Date().toISOString().split('T')[0];
    const logPath = path.join(logDir, `${date}-access.log`);

    this.accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });
  }

  use(req: any, res: any, next: () => void) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    morgan(
      ':method :url HTTP/:http-version :status :res[content-length] - :response-time ms :remote-addr :user-agent',
      { stream: this.accessLogStream },
    )(req, res, next);
  }
}
