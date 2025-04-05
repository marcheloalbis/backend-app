import { Injectable, NestMiddleware } from '@nestjs/common';
import morgan, { StreamOptions } from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly accessLogStream: fs.WriteStream;

  constructor() {
    const logDir = path.resolve(process.cwd(), 'logs/access');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const date = new Date().toISOString().split('T')[0];
    const logPath = path.join(logDir, `${date}-access.log`);

    this.accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

    // Registrar token de fecha en formato local legible
    morgan.token('date', () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      return now.toISOString().replace('T', ' ').split('.')[0];
    });
  }

  use(req: Request, res: Response, next: NextFunction): void {
    const format: string =
      ':date :remote-addr :method :url HTTP/:http-version :status :res[content-length] - :response-time ms ":referrer" ":user-agent"';

    const stream: StreamOptions = {
      write: (message: string) => {
        this.accessLogStream.write(message);
      },
    };

    const loggerMiddleware = morgan(format, { stream }) as (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => void;

    loggerMiddleware(req, res, next);
  }
}
