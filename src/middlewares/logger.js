const winston = require('winston');

// Crear una instancia del logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'debug' }),
    new winston.transports.File({ filename: 'logs/reporter.log', level: 'debug' })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  )
});

module.exports = logger;
