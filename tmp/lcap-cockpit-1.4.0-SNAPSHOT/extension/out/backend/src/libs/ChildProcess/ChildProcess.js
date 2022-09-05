"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = require("child_process");
const notify_1 = require("../logger/notify");
const fromChildProc = (proc) => new Promise((res, rej) => {
    var _a, _b;
    const exitByCode = (code) => code === 0
        ? res(outs.join('')) : rej([...outs, ...errs].join(''));
    const outs = [];
    const errs = [];
    (_a = proc.stdout) === null || _a === void 0 ? void 0 : _a.on('data', data => {
        outs.push(data);
    });
    (_b = proc.stderr) === null || _b === void 0 ? void 0 : _b.on('data', err => {
        errs.push(err);
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
    });
    ['exit', 'error'].forEach(evt => proc.on(evt, exitByCode));
});
const exec = (cmd, cwd = '/tmp') => fromChildProc((0, child_process_1.exec)(cmd, { cwd }));
exports.exec = exec;
//# sourceMappingURL=ChildProcess.js.map