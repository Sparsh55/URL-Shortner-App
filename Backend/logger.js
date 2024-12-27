import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, timestamp, json } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

export default logger;
