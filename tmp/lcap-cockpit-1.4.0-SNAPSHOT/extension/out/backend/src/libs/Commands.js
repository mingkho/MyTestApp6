"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevProjCLI = exports.hasRemoteRepo = exports.hasLocalRepo = exports.freeViaSh = exports.pidsFrom = exports.getCmdFor = exports.buildMdkCLI = exports.exists = exports.refreshIsInBas = exports.isInBAS = void 0;
const ChildProcess_1 = require("./ChildProcess/ChildProcess");
const fs_1 = require("fs");
const path_1 = require("path");
const notify_1 = require("./logger/notify");
const refreshIsInBas = () => exports.isInBAS = (0, ChildProcess_1.exec)('which lwctl')
    .then(resp => resp ? true : false)
    .catch(() => false);
exports.refreshIsInBas = refreshIsInBas;
(0, exports.refreshIsInBas)();
const exists = (root, ...pathFrags) => (0, fs_1.existsSync)((0, path_1.join)(root, ...pathFrags));
exports.exists = exists;
exports.buildMdkCLI = {
    cmd: 'mdk',
    args: ['build', '--target', 'module', '--ui5']
};
const getCmdFor = (cmd) => exports.isInBAS.then(ok => ok ? `lwctl -c basic-tools ${cmd}` : cmd);
exports.getCmdFor = getCmdFor;
const pidsFrom = (pattern) => {
    try {
        pattern = pattern.trim();
        return pattern
            ? exports.isInBAS
                .then(inBas => {
                const rawCmd = `ps aux | grep -vE 'grep|bash'| grep "${pattern}"  | awk '{print $2}'`;
                const cmds = inBas ? [rawCmd, `lwctl -c basic-tools ${rawCmd}`] : [rawCmd];
                return Promise.all(cmds.map(cmd => (0, ChildProcess_1.exec)(cmd)
                    .then(resp => resp.toString().split(/\s/g).filter(i => i))));
            })
                .then(arr => arr.flat())
                .catch(() => [])
            : Promise.resolve([]);
    }
    catch (err) {
        return Promise.resolve([]);
    }
};
exports.pidsFrom = pidsFrom;
const freeViaSh = (...pids) => {
    if (!pids.length) {
        return Promise.resolve();
    }
    return exports.isInBAS.then(inBas => {
        const raw = 'kill';
        const cmds = inBas ? [(0, exports.getCmdFor)(raw), raw] : [raw];
        return cmds.map(cmd => (0, ChildProcess_1.exec)(`${cmd} ${pids.join(' ')}`));
    });
};
exports.freeViaSh = freeViaSh;
const hasLocalRepo = (dir = '.') => {
    return (0, ChildProcess_1.exec)(`cd ${dir} && git status`)
        .then(resp => {
        return resp ? true : false;
    })
        .catch(err => {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
        return Promise.resolve(false);
    });
};
exports.hasLocalRepo = hasLocalRepo;
const hasRemoteRepo = (dir = '.') => {
    return (0, ChildProcess_1.exec)(`cd ${dir} && git remote`)
        .then(resp => resp ? true : false)
        .catch(err => {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
        return Promise.resolve(false);
    });
};
exports.hasRemoteRepo = hasRemoteRepo;
const getDevProjCLI = () => {
    const scriptPath = (0, path_1.join)(__dirname, '../../../../bin/dev_project.sh');
    (0, notify_1.notify)(`Project Tool Path: "${scriptPath}"`, notify_1.NotifyDest.InfoLog);
    return { cmd: 'bash', args: [scriptPath] };
};
exports.getDevProjCLI = getDevProjCLI;
//# sourceMappingURL=Commands.js.map