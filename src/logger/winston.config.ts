import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';

const logDir = path.join(__dirname, '../../logs');

// Crear carpetas si no existen
['error', 'access', 'info'].forEach((dir) => {
  const fullPath = path.join(logDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('BackendApp', {
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      filename: `${logDir}/error/${date}-error.log`,
      level: 'error',
    }),
    new winston.transports.File({
      filename: `${logDir}/info/${date}-reporter.log`,
      level: 'info',
    }),
  ],
};
