const { spawn } = require('child_process');
const { projApiSh, addCR, onTerminated } = require('./common');
const { getLogger } = require('./logger');
const { writer, quadrants } = require('./writer');

const fromChildProc = proc => new Promise((res, rej) => {
  const exitByCode = code => {
    code === 0 ? res(outs.join('')) : rej(errs.join(''));
  };
  const outs = [];
  const errs = [];
  proc.stdout.on('data', data => outs.push(data));
  proc.stderr.on('data', err => errs.push(err));
  ['close', 'exit', 'error'].forEach(evt => proc.on(evt, exitByCode));
});
const exec = (cwd = '/tmp', cmd, ...args) => fromChildProc(spawn(cmd, args, { cwd }));

const custExec = (conf, rootDir, pidsPool, steps = [], errSteps = [], maxTimeout = 60 * 1000) => {
  const logger = getLogger();
  return new Promise((res, rej) => {
    writer.emit('info', `${conf.startingMsg}\r\n`);
    logger('info', conf.startingMsg);
    const proc = spawn('bash', [projApiSh, conf.cmd, rootDir, ...conf.args], { cwd: '/tmp' });
    pidsPool.push(proc.pid);
    let pending = true;
    const spin = idx => {
      if (!pending) { return; }
      setTimeout(() => spin((idx + 1) % quadrants.length), 200);
      writer.emit('info', `${quadrants[idx]}\r\n`);
    };
    spin(0);
    const timeoutToken = setTimeout(() => reject(`${conf.label || ''} timeout`), maxTimeout);
    const resolve = msg => {
      if (!pending) { return; }
      clearTimeout(timeoutToken);
      res(msg);
      pending = false;
    };
    const reject = errMsg => {
      if (!pending) { return; }
      clearTimeout(timeoutToken);
      onTerminated(pidsPool);
      rej(errMsg);
      pending = false;
    };
    const exitByCode = code => code === 0 ? resolve() : reject(code);
    proc.stdout.on('data', data => {
      if (!pending) { return; }
      data = data.toString ? data.toString() : data;
      logger('info', data);
      if (!steps.length) { return writer.emit('info', addCR(data)); }
      steps
        .filter(step => step.pattern().test(data))
        .forEach(step => {
          step.messages.forEach(msg => writer.emit(step.isError ? 'error' : 'success', `${msg}\r\n`));
          if (step.isCritical) { return step.isError ? reject() : resolve(); }
        });
    });
    proc.stderr.on('data', err => {
      err = err.toString ? err.toString() : err;
      logger('error', err);
      if (!errSteps.length) { return writer.emit('error', addCR(err)); }
      const matchedSteps = errSteps.filter(errStep => errStep.pattern().test(err));
      matchedSteps.forEach(errStep => {
        errStep.messages.forEach(msg => writer.emit('error', `${msg}\r\n`));
        if (errStep.isCritical) { return reject(); }
      });
      if (!matchedSteps.length) { return writer.emit('error', addCR(err)); }
    });
    ['close', 'exit', 'error'].forEach(evt => proc.on(evt, exitByCode));
  });
};
module.exports = { exec, custExec };