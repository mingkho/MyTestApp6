"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAndGetApis = void 0;
const vscode_1 = require("vscode");
const EntityCreater_1 = require("./EntityCreater");
const init_1 = require("./Deploy/init");
const init_2 = require("./TestRun/init");
const Erasers_1 = require("./EntityEraser/Erasers");
const Panel_1 = require("./Panel");
const Workspace_1 = require("./Workspace");
const UsageAnalytics_1 = require("./UsageAnalytics");
const objects_1 = require("./UsageAnalytics/objects");
const OPEN_STORYBOARD_CMD = 'lcap.home.openStoryboard';
const openStoryboard = () => !(0, Workspace_1.noWorkspace)() &&
    vscode_1.commands.executeCommand('storyboard.start', (0, Workspace_1.rootFolder)().uri);
const registerAndGetApis = (ctx) => {
    ctx.subscriptions.push(vscode_1.commands.registerCommand(OPEN_STORYBOARD_CMD, () => {
        (0, UsageAnalytics_1.trackUsage)(objects_1.HomeEvents.InvokeStoryboard);
        openStoryboard();
    }));
    const getAndRevealPanel = (0, Panel_1.registerAndGetOpenHomeApi)(ctx);
    (0, Erasers_1.registerAndGetDeletionApi)(ctx);
    (0, EntityCreater_1.registerAndGetCreationApi)(ctx);
    (0, init_2.registerAndGetPreviewApi)(ctx);
    (0, init_1.registerAndGetDeployApi)(ctx);
    return { getAndRevealPanel, openStoryboard };
};
exports.registerAndGetApis = registerAndGetApis;
//# sourceMappingURL=registerAndGetApis.js.map