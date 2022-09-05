"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subAllTaskEvts = exports.refreshAllStates = exports.terminate = exports.fetchStateCacheFor = exports.setStateFor = exports.scriptsByDefName = exports.execsByDefName = exports.states = exports.taskStateHook = void 0;
const vscode_1 = require("vscode");
const Task_1 = require("../../../common/src/Task");
const Task_2 = require("./Task");
const notify_1 = require("../libs/logger/notify");
const Commands_1 = require("../libs/Commands");
const Workspace_1 = require("../libs/Workspace");
const Panel_1 = require("../libs/Panel");
const RpcApi_1 = require("../../../common/src/RpcApi");
const Deploy_1 = require("../libs/Deploy");
const quota_1 = require("../libs/Deploy/quota");
exports.taskStateHook = new vscode_1.EventEmitter();
exports.states = new Map([
    [Task_1.HomepageTasks.TestRun, Task_1.TaskStates.Stopped],
    [Task_1.HomepageTasks.Deploy, Task_1.TaskStates.Stopped],
]);
const execsByDefName = (name) => vscode_1.tasks.taskExecutions.filter(t => t.task.definition.name === name &&
    t.task.definition.type === Task_2.LCAP_PROJ_TASK_TYPE);
exports.execsByDefName = execsByDefName;
const scriptsByDefName = (name) => (0, Workspace_1.noWorkspace)()
    ? Promise.resolve(false)
    : (0, Commands_1.pidsFrom)((0, Task_2.shellCmdFor)(name).split(' ').slice(0, 3).join(' '))
        .then(pids => pids.length ? true : false);
exports.scriptsByDefName = scriptsByDefName;
const getStateFor = (name) => (0, exports.execsByDefName)(name).length
    ? Promise.resolve(Task_1.TaskStates.Running)
    : (0, exports.scriptsByDefName)(name)
        .then(hasScript => hasScript ? Task_1.TaskStates.Running : Task_1.TaskStates.Stopped);
const setStateFor = (name, state) => Promise
    .resolve(state !== null && state !== void 0 ? state : getStateFor(name))
    .then(state => exports.states.set(name, state))
    .finally(() => exports.taskStateHook.fire(name));
exports.setStateFor = setStateFor;
const fetchStateCacheFor = (name) => {
    const resp = exports.states.get(name);
    if (resp !== undefined) {
        return resp;
    }
    return (0, notify_1.notify)(`Unknown task state: ${name}`, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
};
exports.fetchStateCacheFor = fetchStateCacheFor;
const terminate = (name) => {
    const execs = (0, exports.execsByDefName)(name);
    const hasExecs = execs.length ? true : false;
    execs.forEach(exec => {
        try {
            exec.terminate();
        }
        catch (error) {
            return;
        }
    });
    (0, exports.setStateFor)(name, Task_1.TaskStates.Stopped);
    return hasExecs
        ? Promise.resolve()
        : new Promise(res => setTimeout(() => res((0, Commands_1.pidsFrom)((0, Task_2.shellCmdFor)(name)).then(pids => (0, Commands_1.freeViaSh)(...pids)))));
};
exports.terminate = terminate;
const refreshAllStates = () => Object
    .values(Task_1.HomepageTasks)
    .forEach(name => getStateFor(name).then(state => exports.states.set(name, state)));
exports.refreshAllStates = refreshAllStates;
const subAllTaskEvts = (ctx) => {
    const notLcapTask = (evt) => evt.execution.task.definition.type !== Task_2.LCAP_PROJ_TASK_TYPE;
    quota_1.globalState.current = ctx.globalState;
    const onStart = vscode_1.tasks.onDidStartTask(evt => {
        if (notLcapTask(evt)) {
            return;
        }
        (0, exports.setStateFor)(evt.execution.task.definition.name, Task_1.TaskStates.Running);
    });
    const onEnd = vscode_1.tasks.onDidEndTask(evt => {
        if (notLcapTask(evt)) {
            return;
        }
        (0, exports.setStateFor)(evt.execution.task.definition.name, Task_1.TaskStates.Stopped);
        if (evt.execution.task.definition.name === Task_1.HomepageTasks.Deploy) {
            (0, Deploy_1.getDeployInfo)().then(info => { var _a; return (_a = Panel_1.webviewMeta.api) === null || _a === void 0 ? void 0 : _a.post(RpcApi_1.UIEndPoint.notifyDeployInfo, [info]); });
        }
    });
    const onProcEnd = vscode_1.tasks.onDidEndTaskProcess(evt => {
        const deploySucceeded = evt.exitCode === 0 &&
            evt.execution.task.definition.name === Task_1.HomepageTasks.Deploy;
        if (deploySucceeded) {
            (0, quota_1.increaseUsageBy)(1);
        }
    });
    return [onStart, onEnd, onProcEnd];
};
exports.subAllTaskEvts = subAllTaskEvts;
//# sourceMappingURL=states.js.map