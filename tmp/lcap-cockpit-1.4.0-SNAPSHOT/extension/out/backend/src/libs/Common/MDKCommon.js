"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.needRefreshResource = exports.updateMdkByCase = exports.trackMdkTools = exports.MOMENT = exports.MdkToolsCmds = exports.isMdkAppItem = void 0;
const Workspace_1 = require("../Workspace");
const Commands_1 = require("../Commands");
const CockpitApiImpl_1 = require("../CockpitApi/CockpitApiImpl");
const project_1 = require("project");
const path_1 = require("path");
const path_2 = require("path");
const fs_1 = require("fs");
const UsageAnalytics_1 = require("../UsageAnalytics");
const objects_1 = require("../UsageAnalytics/objects");
const isMdkAppItem = (item) => item.type === project_1.ItemType.MDKApplication;
exports.isMdkAppItem = isMdkAppItem;
const getMdkAppItems = () => (0, CockpitApiImpl_1.getUIApps)().filter(exports.isMdkAppItem);
const BUNDLEFILE = "Web/MDKModule/webapp/bundle.js";
var MdkToolsCmds;
(function (MdkToolsCmds) {
    MdkToolsCmds["Build"] = "build";
})(MdkToolsCmds = exports.MdkToolsCmds || (exports.MdkToolsCmds = {}));
exports.MOMENT = { beforePreview: 'before preview' };
const trackMdkTools = (info, cmd = MdkToolsCmds.Build, moment = exports.MOMENT.beforePreview) => {
    if (!(info.forceUpdates.length || info.normalUpdates.length)) {
        return;
    }
    (0, UsageAnalytics_1.trackUsage)(objects_1.HomeEvents.invokeMdkTools, moment, cmd, `${info.forceUpdates.length}`, `${info.normalUpdates.length}`);
};
exports.trackMdkTools = trackMdkTools;
const updateMdkByCase = () => {
    const groupInfo = { forceUpdates: [], normalUpdates: [] };
    const appsChanged = CockpitApiImpl_1.changedMdkApps.current;
    const rootDir = (0, Workspace_1.rootFolder)().uri.fsPath;
    getMdkAppItems().forEach(appItem => {
        const appRoot = (0, path_1.join)(rootDir, (0, path_2.dirname)(appItem.path));
        const bundleJsExist = (0, Commands_1.exists)(appRoot, BUNDLEFILE);
        let resChanged = false;
        if (bundleJsExist) {
            resChanged = (0, exports.needRefreshResource)(appRoot);
        }
        else {
            resChanged = true;
        }
        if (!appsChanged[appItem.path] && bundleJsExist && !resChanged) {
            return;
        }
        const group = !resChanged ? 'normalUpdates' : 'forceUpdates';
        groupInfo[group].push(appRoot);
    });
    return groupInfo;
};
exports.updateMdkByCase = updateMdkByCase;
const needRefreshResource = (appRoot) => {
    let resChanged = false;
    try {
        const appBundleTime = (0, fs_1.statSync)((0, path_1.join)(appRoot, BUNDLEFILE)).mtime;
        const imageFolderExist = (0, Commands_1.exists)(appRoot, "Images");
        if (imageFolderExist) {
            const imgTime = (0, fs_1.statSync)((0, path_1.join)(appRoot, "Images")).mtime;
            if (imgTime > appBundleTime) {
                return true;
            }
        }
        const projectJsonExist = (0, Commands_1.exists)(appRoot, ".project.json");
        if (projectJsonExist) {
            const projectTime = (0, fs_1.statSync)((0, path_1.join)(appRoot, ".project.json")).mtime;
            if (projectTime > appBundleTime) {
                resChanged = true;
            }
        }
        else {
            resChanged = true;
        }
    }
    catch (e) {
        resChanged = true;
    }
    return resChanged;
};
exports.needRefreshResource = needRefreshResource;
//# sourceMappingURL=MDKCommon.js.map