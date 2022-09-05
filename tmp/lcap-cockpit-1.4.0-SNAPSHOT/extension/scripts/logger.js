const { createWriteStream } = require("fs");
const { inspect } = require("util");
const { homedir } = require('os');
const { join } = require("path");

const LOG_FILE_NAME = (dateStr = new Date().toISOString().slice(0, 10)) =>
  `lcap.home.${dateStr}.log`;

const defaultFormatter = (level, ...args) =>
  `${new Date().toISOString()} [${level}] ${args.map(arg => inspect(arg)).join(" ")} \n`;

const getLogger = (
  logPath = join(homedir(), LOG_FILE_NAME()),
  formatter = defaultFormatter
) => {
  const fileStream = createWriteStream(logPath, { flags: "a" });
  return (level, args) => fileStream.write(formatter(level, args));
};

module.exports = { getLogger, LOG_FILE_NAME };