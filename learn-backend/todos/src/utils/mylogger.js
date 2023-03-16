const winston = require("winston");

const getShortPath = (fullPath) => fullPath.substr(fullPath.indexOf("src"));

// Logger configuration
const logConfiguration = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info) => {
      return `${info.timestamp} - ${getShortPath(__filename)}:[${
        info.level
      }]: ${info.message}`;
    })
  ),
};
// Create the logger
const logger = winston.createLogger(logConfiguration);
module.exports = logger;
