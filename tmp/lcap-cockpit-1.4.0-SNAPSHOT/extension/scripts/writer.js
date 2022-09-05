const EventEmitter = require("events");

const writer = new EventEmitter();

const colors = {
  success: ['\x1b[32m', '\x1b[0m'],
  info: ['', ''],
  error: ['\x1b[31m', '\x1b[0m'],
};

const quadrants = ['╣', '╩', '╠', '╦'];

const quadrantSet = new Set(quadrants);

let prevCharBuffer = '';

Object.keys(colors).forEach(lv =>
  writer.on(lv, msg => {
    if (!msg || !(msg.trim && msg.trim())) { return; }
    if (quadrantSet.has(prevCharBuffer.trim())) {
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine(1);
    }
    process.stdout.write(`${colors[lv][0]}${msg}${colors[lv][1]}`);
    prevCharBuffer = msg;
  })
);

module.exports = { writer, quadrants };