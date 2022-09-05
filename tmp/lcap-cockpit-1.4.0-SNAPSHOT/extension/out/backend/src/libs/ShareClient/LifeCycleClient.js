"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchLifecycleHook = exports.notifyCountChanges = exports.openUI = exports.getDeeplinkUrl = exports.getRemote = exports.countFilesChanged = exports.status = exports.discardAndPull = exports.push = exports.pull = exports.invokeProjectLifecycle = exports.LifecycleOp = exports.hasLifecycleExt = exports.refreshExtState = exports.LIFECYCLE_EXT_ID = exports.lifecycleHook = void 0;
const vscode_1 = require("vscode");
const LifeCycleStatus_1 = require("../../../../common/src/LifeCycleStatus");
const Commands_1 = require("../Commands");
const notify_1 = require("../logger/notify");
const Workspace_1 = require("../Workspace");
const ProjectClient_1 = require("../ProjectClient");
const constants_1 = require("./constants");
const RespHandler_1 = require("./RespHandler");
const child_process_1 = require("child_process");
const Util_1 = require("../Util");
const RpcApi_1 = require("../../../../common/src/RpcApi");
const EventEmitter = require("events");
exports.lifecycleHook = new EventEmitter();
exports.LIFECYCLE_EXT_ID = 'project-lifecycle-sap.project-lifecycle';
const hasExt = (id) => vscode_1.extensions.all.some(ext => ext.id.toLowerCase() === id);
const refreshExtState = () => exports.hasLifecycleExt = hasExt(exports.LIFECYCLE_EXT_ID);
exports.refreshExtState = refreshExtState;
exports.hasLifecycleExt = hasExt(exports.LIFECYCLE_EXT_ID);
vscode_1.extensions.onDidChange(exports.refreshExtState);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const execCmd = (cmd, ...rest) => exports.hasLifecycleExt
    ? vscode_1.commands.executeCommand(`${constants_1.PROJ_LIFECYCLE_EXT_ID}.${cmd}`, ...rest)
    : Promise.reject('no lifecycle extension');
var LifecycleOp;
(function (LifecycleOp) {
    LifecycleOp["AfterPush"] = "after-push";
    LifecycleOp["AfterPull"] = "after-pull";
    LifecycleOp["AfterAddRemote"] = "after-add-remote";
    LifecycleOp["OnConfigChange"] = "on-config-change";
})(LifecycleOp = exports.LifecycleOp || (exports.LifecycleOp = {}));
const invokeProjectLifecycle = (cmd, projectPath) => execCmd(cmd, projectPath)
    .then((resp) => {
    if (!(0, RespHandler_1.hasError)(resp)) {
        return resp;
    }
    if (constants_1.silentErrors.includes(resp)) {
        return;
    }
    return Promise.reject(resp);
}).then(undefined, handleErr);
exports.invokeProjectLifecycle = invokeProjectLifecycle;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleErr = (err) => (0, notify_1.notify)((0, RespHandler_1.handleErrorResp)(err), notify_1.NotifyDest.ErrMsgBox);
const pull = () => execCmd(constants_1.ShareCommands.Pull)
    .then(code => {
    if (code === constants_1.SUCCESS_CODE) {
        return exports.lifecycleHook.emit(LifecycleOp.AfterPull);
    }
    if (code !== constants_1.OPERATION_ERROR_CODES.MERGE_CONFLICT) {
        return Promise.reject(code);
    }
}).then(undefined, handleErr);
exports.pull = pull;
const push = () => vscode_1.window
    .showInputBox({
    ignoreFocusOut: true,
    placeHolder: 'Input any commit messages or Press Enter to use default message',
    prompt: '[Optional] any commit messages'
})
    .then((commitMsg) => typeof commitMsg === 'string'
    ? execCmd(constants_1.ShareCommands.Push, commitMsg)
    : Promise.reject(''))
    .then(code => {
    if (code === constants_1.SUCCESS_CODE) {
        return exports.lifecycleHook.emit(LifecycleOp.AfterPush);
    }
    if (code !== constants_1.OPERATION_ERROR_CODES.MERGE_CONFLICT) {
        return Promise.reject(code);
    }
}).then(undefined, handleErr);
exports.push = push;
const discardAndPull = () => execCmd(constants_1.ShareCommands.DiscardChanges)
    .then(code => {
    if (code === constants_1.SUCCESS_CODE) {
        vscode_1.window.showInformationMessage('changes discarded, then updating succeeded');
        return exports.lifecycleHook.emit(LifecycleOp.AfterPull);
    }
    (0, notify_1.notify)(`discardlocalchanges err: ${code}`, notify_1.NotifyDest.ErrLog);
    return Promise.reject(code);
}).then(undefined, handleErr);
exports.discardAndPull = discardAndPull;
const codeToStatus = (behind) => behind === 0
    ? LifeCycleStatus_1.LifecycleStatus.UpToDate
    : LifeCycleStatus_1.LifecycleStatus.BehindOfRemote;
const status = () => ProjectClient_1.ProjectClient.hasProj.then(async (hasProj) => {
    if ((0, Workspace_1.noWorkspace)() || !hasProj) {
        return LifeCycleStatus_1.LifecycleStatus.NoProject;
    }
    const projDir = (0, Workspace_1.rootFolder)().uri.fsPath;
    if (!(await (0, Commands_1.hasLocalRepo)(projDir))) {
        return LifeCycleStatus_1.LifecycleStatus.NoRepo;
    }
    if (!(await (0, Commands_1.hasRemoteRepo)(projDir))) {
        return LifeCycleStatus_1.LifecycleStatus.NoRemote;
    }
    return execCmd(constants_1.ShareCommands.Status)
        .then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (resp) => {
        if ((resp === null || resp === void 0 ? void 0 : resp.behind) !== undefined) {
            return codeToStatus(resp.behind);
        }
        (0, notify_1.notify)(`status err: ${resp}`, notify_1.NotifyDest.ErrLog);
        return Promise.reject(resp);
    }).then(undefined, handleErr);
});
exports.status = status;
const countFilesChanged = (cwd = '.') => {
    try {
        const strResp = (0, child_process_1.execSync)('git status -s -uall | wc -l', { cwd });
        const count = Number(strResp);
        (0, notify_1.notify)(`files changed in ${cwd}: ${count}`, notify_1.NotifyDest.InfoLog);
        return count;
    }
    catch (err) {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
        return 0;
    }
};
exports.countFilesChanged = countFilesChanged;
const getRemote = (projectPath) => (0, exports.invokeProjectLifecycle)(constants_1.ShareCommands.GetRemote, projectPath);
exports.getRemote = getRemote;
const getDeeplinkUrl = (projectPath) => (0, exports.invokeProjectLifecycle)(constants_1.ShareCommands.GetDeepLinkUrl, projectPath);
exports.getDeeplinkUrl = getDeeplinkUrl;
const openUI = (projectPath) => (0, exports.invokeProjectLifecycle)(constants_1.ShareCommands.OpenProjectSharingUI, projectPath)
    .then(() => exports.lifecycleHook.emit(LifecycleOp.AfterAddRemote, projectPath));
exports.openUI = openUI;
const notifyLifecycleStatus = (api, projectPath) => (0, exports.status)()
    .then(stat => api.post(RpcApi_1.UIEndPoint.notifyLifeCycleStatus, [projectPath, stat]));
exports.notifyCountChanges = (0, Util_1.debounce)((api, projectPath) => {
    const count = (0, exports.countFilesChanged)(projectPath);
    return api.get(RpcApi_1.UIEndPoint.notifyCountChanges, [count]);
}, 1500);
const notifyRemoteUrl = async (api, projectPath) => {
    const url = await (0, exports.getRemote)(projectPath);
    return api === null || api === void 0 ? void 0 : api.get(RpcApi_1.UIEndPoint.notifyRemoteUrl, [url]);
};
const dispatchLifecycleHook = (api) => {
    exports.lifecycleHook.addListener(LifecycleOp.AfterAddRemote, (projectPath) => {
        notifyLifecycleStatus(api, projectPath);
        notifyRemoteUrl(api, projectPath);
    });
    exports.lifecycleHook.addListener(LifecycleOp.AfterPull, (projectPath) => notifyLifecycleStatus(api, projectPath));
    exports.lifecycleHook.addListener(LifecycleOp.AfterPush, (projectPath) => notifyLifecycleStatus(api, projectPath));
    exports.lifecycleHook.addListener(LifecycleOp.OnConfigChange, (projectPath) => {
        notifyLifecycleStatus(api, projectPath);
        notifyRemoteUrl(api, projectPath);
        (0, exports.notifyCountChanges)(api, projectPath);
    });
};
exports.dispatchLifecycleHook = dispatchLifecycleHook;
//# sourceMappingURL=LifeCycleClient.js.map