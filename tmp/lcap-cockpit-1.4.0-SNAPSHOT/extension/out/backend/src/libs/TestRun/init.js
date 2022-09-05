"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRemoteRunEnv = exports.registerAndGetPreviewApi = exports.runProj = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const vscode_1 = require("vscode");
const notify_1 = require("../logger/notify");
const LcapTestRun_1 = require("./LcapTestRun");
const testRunTask_1 = require("../../tasks/testRunTask");
const Task_1 = require("../../../../common/src/Task");
const UsageAnalytics_1 = require("../UsageAnalytics");
const objects_1 = require("../UsageAnalytics/objects");
const PreviewConfig_1 = require("./PreviewConfig");
const LCAP_HOME_PREVIEW_CMD = 'lcap.home.preview';
const runProj = async (previewMode = Task_1.PreviewModes.WithMock) => {
    (0, UsageAnalytics_1.trackUsage)(objects_1.HomeEvents.StartPreview, previewMode);
    const previewConfig = await (0, PreviewConfig_1.getConfigBy)(previewMode);
    (0, testRunTask_1.setTestRunTaskEnv)(previewConfig.env);
    return Promise
        .resolve(new LcapTestRun_1.LcapTestRun().run())
        .catch(err => {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
        return Promise.reject(err);
    });
};
exports.runProj = runProj;
const registerAndGetPreviewApi = (ctx) => {
    ctx.subscriptions.push(vscode_1.commands.registerCommand(LCAP_HOME_PREVIEW_CMD, exports.runProj));
    return exports.runProj;
};
exports.registerAndGetPreviewApi = registerAndGetPreviewApi;
const setRemoteRunEnv = (remoteDestStr) => {
    let testRunTaskEnv = undefined;
    if (remoteDestStr) {
        testRunTaskEnv = { "destinations": remoteDestStr, "NODE_ENV": "production" };
    }
    (0, testRunTask_1.setTestRunTaskEnv)(testRunTaskEnv);
};
exports.setRemoteRunEnv = setRemoteRunEnv;
//# sourceMappingURL=init.js.map