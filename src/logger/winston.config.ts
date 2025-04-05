import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';

const logDir = path.resolve(__dirname, '../../logs');

['error', 'access', 'info'].forEach((dir) => {
  const fullPath = path.join(logDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const date = new Date().toISOString().split('T')[0];

const customJsonFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const log: Record<string, unknown> = {
      timestamp,
      level,
      message,
      ...(stack ? { stack } : {}),
      ...(meta && Object.keys(meta).length ? { meta } : {}),
    };
    return JSON.stringify(log);
  }),
);

export const winstonConfig: winston.LoggerOptions = {
  format: customJsonFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, 'error', `${date}-error.log`),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'info', `${date}-reporter.log`),
      level: 'info',
    }),
  ],
};
