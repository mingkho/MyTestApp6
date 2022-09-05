"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestDeployInfo = void 0;
const project_1 = require("project");
const DeployState_1 = require("../../../../common/src/Deploy/DeployState");
const notify_1 = require("../logger/notify");
const getLatestDeployInfo = (projApi) => (projApi
    ? (new project_1.ProjectImpl(projApi.fs().rootPath)).getApplicationDeploymentSummary()
    : Promise.reject('no Project Api instance'))
    .then(summary => summary
    ? {
        state: DeployState_1.DeployState.HasOverviewPageUrl,
        overviewPage: {
            url: summary.ProjectOverviewURL || '',
            finishedAt: summary.DeployedUTCTime ? new Date(summary.DeployedUTCTime) : undefined
        }
    }
    : { state: DeployState_1.DeployState.NoOverviewPageUrl })
    .catch(err => {
    (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
    return { state: DeployState_1.DeployState.NoOverviewPageUrl };
});
exports.getLatestDeployInfo = getLatestDeployInfo;
//# sourceMappingURL=info.js.map