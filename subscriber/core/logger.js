const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

const formatTimestamp = (time) => {
  return new Date(time).toLocaleString('en-GB');
}

const logFormat = printf(({level, message, label, timestamp}) => {
  return `${formatTimestamp(timestamp)} - ${level}: \t\t ${message}`
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    logFormat
  ),
  defaultMeta: { service: 'smoke-signal-service', time: new Date().toISOString() },
  transports: [
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
  ]
});

module.exports = logger;
