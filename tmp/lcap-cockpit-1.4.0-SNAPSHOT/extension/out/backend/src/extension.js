"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const Task_1 = require("./tasks/Task");
const loggerImpl_1 = require("./libs/logger/loggerImpl");
const Panel_1 = require("./libs/Panel");
const notify_1 = require("./libs/logger/notify");
const tasks_1 = require("./tasks");
const states_1 = require("./tasks/states");
const registerAndGetApis_1 = require("./libs/registerAndGetApis");
const GuidedDevelopment_1 = require("./libs/GuidedDevelopment");
const HomeActivation_1 = require("./libs/Common/HomeActivation");
const UsageAnalytics_1 = require("./libs/UsageAnalytics");
const objects_1 = require("./libs/UsageAnalytics/objects");
const Manifest_1 = require("./libs/Manifest");
const BasApi_1 = require("./libs/BasApi");
function activate(ctx) {
    (0, Manifest_1.setHomePkgJson)(ctx.extensionPath);
    const homepageApi = (0, registerAndGetApis_1.registerAndGetApis)(ctx);
    (0, loggerImpl_1.initLogger)(ctx)
        .then(() => {
        (0, notify_1.notify)('Welcome to LCAP Homepage.', notify_1.NotifyDest.InfoLog);
        (0, UsageAnalytics_1.initTracker)().finally(() => (0, UsageAnalytics_1.trackUsage)(objects_1.HomeEvents.BeforeActivate));
    })
        .finally(() => {
        var _a;
        (0, BasApi_1.refreshBasApi)();
        /* istanbul ignore next */
        return (((_a = BasApi_1.basAPI.current) === null || _a === void 0 ? void 0 : _a.isOpenedForAction)
            ? BasApi_1.basAPI.current.isOpenedForAction()
            : Promise.resolve(false))
            .then(hasPkgActions => !hasPkgActions
            ? (0, Panel_1.getOrCreatePanel)(ctx.extensionPath)
                .then(panel => panel.reveal())
                .then(() => (0, HomeActivation_1.increaseActivationCountBy)(ctx, 1))
                .then(() => (0, GuidedDevelopment_1.invokeGuidedDevOnDemand)(ctx))
            /* istanbul ignore next */
            : undefined);
    });
    vscode_1.tasks.registerTaskProvider(Task_1.LCAP_PROJ_TASK_TYPE, (0, tasks_1.provideHomepageTasks)());
    (0, states_1.refreshAllStates)();
    ctx.subscriptions.push(...(0, states_1.subAllTaskEvts)(ctx));
    return homepageApi;
}
exports.activate = activate;
const deactivate = () => {
    /* istanbul ignore next */
    (0, UsageAnalytics_1.trackUsage)(objects_1.HomeEvents.BeforeDeactivate);
};
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map