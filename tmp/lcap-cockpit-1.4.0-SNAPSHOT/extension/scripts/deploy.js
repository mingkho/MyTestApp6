const { existsSync } = require('fs');
const { writer } = require('./writer');
const { custExec, exec } = require('./child-process');
const { getLogger, LOG_FILE_NAME } = require('./logger');
const { silencer, projApiSh } = require('./common');
const { ACTION_FAIL } = require('./constants');

const deployMsg = {
  START: 'Starting: Deploy action initiated',
  BUILD: 'Generating project files and packages ...',
  DEPLOY: 'Deploying project files, it might take a while ...',
  SUCCESS: '✓ Done. Your application has been deployed.',
  GENERAL_FAIL_ERR: () => `Could not deploy your application. You can check /home/user/${LOG_FILE_NAME()} to debug and resolve.`,
  ERR_EXIT: () => `Unable to deploy. For more information, you can check /home/user/${LOG_FILE_NAME()} to resolve it and try again.`,
  APPLICATION_OVERVIEW_URL: applicationOverviewURL => `You can visit the application at: ${applicationOverviewURL}`
};

const steps = [
  { pattern: () => /Building mtar file/, messages: [deployMsg.BUILD] },
  { pattern: () => /Deploying mtar file/, messages: [deployMsg.DEPLOY] },
  { pattern: () => /Process finished/, messages: [deployMsg.SUCCESS], isCritical: true },
  { pattern: () => /\[FATAL\]/, messages: [ACTION_FAIL, deployMsg.GENERAL_FAIL_ERR()], isError: true, isCritical: true },
  { pattern: () => /\[ERROR\]/, messages: [ACTION_FAIL, deployMsg.GENERAL_FAIL_ERR()], isError: true, isCritical: true },
  { pattern: () => /operation failed/i, messages: [ACTION_FAIL, deployMsg.GENERAL_FAIL_ERR()], isError: true, isCritical: true },
];

const errSteps = [
  { pattern: () => /WARN/, messages: [] },
  { pattern: () => />\s/, messages: [] },
  { pattern: () => /builder:builder/, messages: [] },
  { pattern: () => /info/, messages: [] },
  { pattern: () => /npx/, messages: [] },
  { pattern: () => /cp: no such file or directory/, messages: [] },
  { pattern: () => /No description/, messages: [] },
  { pattern: () => /SKIPPING OPTIONAL DEPENDENCY/, messages: [] },
  { pattern: () => /Accessing non-existent property/, messages: [], },
  { pattern: () => /Running task/, messages: [], },
  { pattern: () => /created a lockfile as/, messages: [], },
  { pattern: () => /^\s*npm\s*$/, messages: [], },
  { pattern: () => /npm notice/, messages: [], },
  { pattern: () => /postinstall cds-compiler/, messages: [], },
  { pattern: () => /node binary used for scripts/, messages: [], },
  { pattern: () => /Unexpected reserved word/, messages: [], },
  { pattern: () => /No \w+ field/, messages: [], },
  { pattern: () => /Building/, messages: [], },
  { pattern: () => /warning:/, messages: [], },
  { pattern: () => /versions/, messages: [], },
  { pattern: () => /Please upgrade to/, messages: [], },
  { pattern: () => /lbt:resources:ResourcePool/, messages: [], },
  { pattern: () => /Executing cleanup tasks/, messages: [], },
  { pattern: () => /has been deprecated/, messages: [], },
  { pattern: () => /deprecated [.\w-]+@/, messages: [], },
  { pattern: () => /Build succeeded/i, messages: [], },
];

const getApplicationOverviewURL = rootDir => {
  const cmd = 'get-projectoverview-url';
  return exec('/tmp', 'bash', projApiSh, cmd, rootDir)
    .then(data => {
      const applicationOverviewURL = data.match(/applicationOverviewURL:\s*'(.+)'\n/)[1];
      writer.emit('success', deployMsg.APPLICATION_OVERVIEW_URL(applicationOverviewURL));
    })
}

const isFreeTenantPlan = () => process.env['TENANT_PLAN'] === 'free'

const deploy = rootDir => {
  const logger = getLogger();
  if (!existsSync(rootDir)) { return writer.emit('error', `${rootDir} doesn't exist.`); }
  return custExec(
    { startingMsg: deployMsg.START, cmd: 'deploy', args: [] },
    rootDir, [], steps, errSteps, 60 * 60 * 1000
  )
    .then(() => getApplicationOverviewURL(rootDir))
    .catch(err => {
      logger('error', err);
      if (err && typeof err !== 'number') { writer.emit('info', err); }
      writer.emit('error', deployMsg.ERR_EXIT());
      setTimeout(() => process.exit(isFreeTenantPlan() ? 1 : 0));
    });
};

silencer();

deploy(process.argv[2]);
