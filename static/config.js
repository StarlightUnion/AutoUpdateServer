const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
require('winston-daily-rotate-file')

// 日志记录
const transport = new(transports.DailyRotateFile)({
  filename: '../logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: '14d',
  format: combine(
    label({
      label: 'right meow!'
    }),
    timestamp(),
    prettyPrint()
  ),
});
transport.on('rotate', function(oldFilename, newFilename) {});

const logger = createLogger({
  transports: [
    transport
  ]
});

module.exports = {
  HOST: "127.0.0.1", // 云服务器要填写该服务器的内网IP
  PORT: 9000,
  logger: logger
};