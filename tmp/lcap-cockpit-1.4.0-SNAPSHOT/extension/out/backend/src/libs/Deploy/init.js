"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAndGetDeployApi = exports.deployProj = void 0;
const CloudFoundry_1 = require("../CloudFoundry");
const notify_1 = require("../logger/notify");
const LcapDeploy_1 = require("./LcapDeploy");
const states_1 = require("../../tasks/states");
const Task_1 = require("../../../../common/src/Task");
const vscode_1 = require("vscode");
const UsageAnalytics_1 = require("../UsageAnalytics");
const objects_1 = require("../UsageAnalytics/objects");
const quota_1 = require("./quota");
const LCAP_HOME_DEPLOY_CMD = 'lcap.home.deploy';
const E_MISS_TOKEN = 'miss token';
const E_PROMPT_UPGRADE = () => `Your free tier usage limit exceeded. Upgrade to the Standard plan to continue with deployment.`;
const deployProj = () => (0, CloudFoundry_1.hasLoggedIn)()
    .then(loggedIn => loggedIn ? undefined : Promise.reject(E_MISS_TOKEN))
    .then(() => (0, quota_1.hasAvailableQuota)() ? undefined : Promise.reject(E_PROMPT_UPGRADE()))
    .then(() => {
    (0, UsageAnalytics_1.trackUsage)(objects_1.HomeEvents.StartDeploy);
    return new LcapDeploy_1.LcapDeploy().deploy();
})
    .catch(err => {
    (0, states_1.setStateFor)(Task_1.HomepageTasks.Deploy);
    if (err === E_MISS_TOKEN) {
        return (0, CloudFoundry_1.login)(exports.deployProj);
    }
    (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
});
exports.deployProj = deployProj;
const registerAndGetDeployApi = (ctx) => {
    ctx.subscriptions.push(vscode_1.commands.registerCommand(LCAP_HOME_DEPLOY_CMD, exports.deployProj));
    return exports.deployProj;
};
exports.registerAndGetDeployApi = registerAndGetDeployApi;
//# sourceMappingURL=init.js.map