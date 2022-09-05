const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');
const { writer } = require('./writer');
const { exec, custExec } = require('./child-process');
const { isInBas, silencer, getRealUrlFor } = require('./common');
const { GENERAL_ERR } = require('./constants');
const { getLogger } = require('./logger');

const testRunMsg = {
  START: 'Starting: Preview action initiated',
  PREP_INST: 'Installing and packaging all modules of your project ...',
  UPDATE_UI: 'Monitoring and updating your project with new file changes, if any ...',
  EADDRINUSE: 'Error: Unable to preview',
  EADDRINUSE_ADVICE: 'Stop the previously running actions and try again.',
  E_NO_DATAMODEL: 'Error: No data model found',
  E_NO_DATAMODEL_ADVICE: 'From the home page, click Add (+) on the Data Model tile to create a data model and then preview your application.',
  E_COMPILATION_FAIL: 'Error: Compilation Failed',
  E_COMPILATION_FAIL_ADVICE: 'Check your data model/service to fix it and try again.',
  SUCCESS: () => `✓ Done:  You can access your app from here: ${getRealUrlFor(4004)}`
};

const steps = [
  { pattern: () => /error/i, messages: [GENERAL_ERR()], isCritical: true, isError: true },
  {
    pattern: () => /No models found in/,
    messages: [testRunMsg.E_NO_DATAMODEL, testRunMsg.E_NO_DATAMODEL_ADVICE],
    isCritical: true,
    isError: true
  },
  { pattern: () => /localhost/, messages: [testRunMsg.SUCCESS()], isCritical: true },
];

const errSteps = [
  // dev-project run . will throw this line from stderr
  { pattern: () => /> cds watch/, messages: [], },
  { pattern: () => /error/i, messages: [GENERAL_ERR()] },
  { pattern: () => /Accessing non-existent property/, messages: [], },
  {
    pattern: () => /EADDRINUSE/i,
    messages: [testRunMsg.EADDRINUSE, testRunMsg.EADDRINUSE_ADVICE],
    isCritical: true
  },
  {
    pattern: () => /CompilationError/,
    messages: [testRunMsg.E_COMPILATION_FAIL, testRunMsg.E_COMPILATION_FAIL_ADVICE],
    isCritical: true
  },
];

const execNpmInstall = dir => {
  if (existsSync(join(dir, 'node_modules', 'sqlite3'))) { return Promise.resolve(); }
  writer.emit('info', `${testRunMsg.PREP_INST}\r\n`);
  return exec(dir, 'npm', ['i']);
};

const cdsWatchPids = () => {
  const patterns = ['watch.js', 'cds watch'];
  const getPidsBy = pattern => `ps aux | grep -vE 'grep|bash'| grep '${pattern}' | awk '{print $2}'`;
  const cmds = patterns.map(p => getPidsBy(p));
  if (isInBas) { cmds.push(...patterns.map(p => `lwctl -c basic-tools ${getPidsBy(p)}`)); }
  return cmds.map(cmd => {
    try {
      return execSync(cmd, { cwd: '/tmp' }).toString().split(/\s/g).filter(i => i);
    } catch (err) {
      return [];
    }
  }).flat();
};

const freeAllCdsWatch = () => {
  return cdsWatchPids().forEach(pid => {
    try { process.kill(pid); } catch (err) { }
  });
};

const buildMdkCLI = {
  cmd: 'mdk',
  args: ['build', '--target', 'module', '--ui5']
};

const buildAllMdkApps = async mdkGroups => {
  if (!mdkGroups.normalUpdates.length && !mdkGroups.forceUpdates.length) { return Promise.resolve(); }
  writer.emit('info', `${testRunMsg.UPDATE_UI}\r\n`);
  return Promise.all([
    ...mdkGroups.normalUpdates.map(appRoot => exec(appRoot, buildMdkCLI.cmd, ...buildMdkCLI.args)),
    ...mdkGroups.forceUpdates.map(appRoot => exec(appRoot, buildMdkCLI.cmd, ...buildMdkCLI.args.concat('--forceUpdate'))),
  ]);
};

const testRun = (rootDir, mdkGroupStr = '{ "forceUpdates": [], "normalUpdates": [] }') => {
  const logger = getLogger();
  if (!existsSync(rootDir)) { return writer.emit('error', `${rootDir} doesn't exist.`); }
  const mdkGroup = JSON.parse(mdkGroupStr);
  return execNpmInstall(rootDir)
    .then(() => buildAllMdkApps(mdkGroup))
    .then(() => freeAllCdsWatch())
    .then(() => custExec({ startingMsg: testRunMsg.START, cmd: 'run', args: ['open'] }, rootDir, [], steps, errSteps), 20 * 60 * 1000)
    .catch(err => {
      err && logger('error', err);
      if (err && typeof err !== 'number') { writer.emit('info', err); }
      setTimeout(() => process.exit(0));
    });
};

silencer();

testRun(process.argv[2], process.argv[3]);