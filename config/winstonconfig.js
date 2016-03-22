var winston = require("winston");
var DailyRotateFile = require("winston-daily-rotate-file");

var config = {
  transports: [
    new winston.transports.Console({
      level: "error",
      json: false
    }),
    new DailyRotateFile({
      name: "warnLogger",
      level: "warn",
      dirname: "logs",
      filename: "warn-",
      datePattern: "yyyy-MM-dd_HH.log",
      json: false
    }),
    new DailyRotateFile({
      name: "debugLogger",
      level: "debug",
      dirname: "logs",
      filename: "debug-",
      datePattern: "yyyy-MM-dd_HH.log",
      json: false
    })
  ]
};

var logger = new winston.Logger(config);

module.exports = logger;