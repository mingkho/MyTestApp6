const { execSync } = require("child_process");
const { join } = require("path");
const { getLogger } = require("./logger");

const projApiSh = join(__dirname, '..', 'bin', 'dev_project.sh');

const addCR = msg => msg.replace(/(?<!\r)\n/g, "\r\n");

const onTerminated = pids => pids.forEach(pid => {
  try { process.kill(pid); } catch (err) { }
});

const isInBas = (() => {
  try {
    return execSync('which lwctl') ? true : false;
  } catch (error) {
    return false;
  }
})();

const alwaysSilent = () => process.exit(0);

const exitSigs = ['SIGTERM', 'SIGINT', 'SIGHUP'];

const silencer = () => exitSigs.forEach(sig => process.on(sig, alwaysSilent));

const getRealUrlFor = port => {
  try {
    const strResp = execSync(`curl -s "http://localhost:3001/AppStudio/api/getHostByPort?port=${port}"`);
    const { result } = JSON.parse(strResp);
    if (result && result.startsWith && result.startsWith('http')) { return result; }
    throw new Error(`error: ${result}`);
  } catch (error) {
    getLogger()('error', error);
    return `http://localhost:${port}`;
  }
};

module.exports = { projApiSh, addCR, onTerminated, isInBas, silencer , getRealUrlFor};