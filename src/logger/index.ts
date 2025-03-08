import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { printf, timestamp, combine } = format;

const defaultOptions = {
  datePattern: 'YYYY-MM-DD',
};

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new DailyRotateFile({
      filename: '%DATE%.info.log',
      dirname: 'logs/info',
      level: 'info',
      ...defaultOptions,
    }),
    new DailyRotateFile({
      filename: '%DATE%.http.log',
      dirname: 'logs/http',
      level: 'http',
      ...defaultOptions,
    }),
    new DailyRotateFile({
      filename: '%DATE%.error.log',
      dirname: 'logs/errors',
      level: 'error',
      ...defaultOptions,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

export default logger;
