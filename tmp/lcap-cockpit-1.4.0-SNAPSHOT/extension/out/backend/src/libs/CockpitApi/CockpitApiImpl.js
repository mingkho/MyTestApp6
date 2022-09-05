"use strict";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * The project dashboard displays entities of the project grouped in "Categories".
 * Each "Category" lists entities of different types that belong to this "Category".
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchWorkspaceChanges = exports.refreshHomePage = exports.dispatchTaskStateHook = exports.dispatchFileChanges = exports.triggerValidationFor = exports.refreshChangedMdkApps = exports.changedMdkApps = exports.getUIApps = exports.fetchEntriesDebounced = exports.fetchEntries = exports.parseModuleLinks = exports.populateItemsInfo = exports.groupCount = exports.countCockpitEntries = exports.projectStatus = exports.cockpitData = exports.hasPartialInvalid = exports.itemPathMap = exports.moduleTypeMap = exports.linkedModules = exports.entries = void 0;
const project_1 = require("project");
const ProjectClient_1 = require("../ProjectClient");
const RpcApi_1 = require("../../../../common/src/RpcApi");
const notify_1 = require("../logger/notify");
const getEmptyData_1 = require("../../../../common/src/getEmptyData");
const Workspace_1 = require("../Workspace");
const path_1 = require("path");
const fs_1 = require("fs");
const Transformer_1 = require("./Transformer");
const LifeCycleClient_1 = require("../ShareClient/LifeCycleClient");
const states_1 = require("../../tasks/states");
const Util_1 = require("../Util");
const loggerImpl_1 = require("../logger/loggerImpl");
const SampleDataUtil_1 = require("../EntityCreater/SampleDataUtil");
const DependencyResolver_1 = require("../DependencyResolver");
const Validator_1 = require("../Validator");
exports.entries = { current: [] };
exports.linkedModules = { current: [] };
exports.moduleTypeMap = { current: new Map() };
exports.itemPathMap = { current: new Map() };
exports.hasPartialInvalid = { current: false };
exports.cockpitData = { current: (0, getEmptyData_1.getEmptyData)() };
exports.projectStatus = {
    current: { hasWorkspace: !(0, Workspace_1.noWorkspace)() }
};
const countCockpitEntries = (cockpit) => Object.keys(cockpit)
    .reduce((sum, cateName) => cockpit[cateName].entries.length + sum, 0);
exports.countCockpitEntries = countCockpitEntries;
const groupCount = (items) => {
    const stat = new Map();
    items.forEach(i => {
        const t = i.type;
        if (!stat.has(t)) {
            stat.set(t, 0);
        }
        stat.set(t, stat.get(t) + 1);
    });
    return [...stat].map(ent => ` ${ent[0]}: ${ent[1]} `).join("  \n");
};
exports.groupCount = groupCount;
const populateItemsInfo = (items, api) => items.map(item => {
    switch (item.type) {
        case project_1.ItemType.CDSEntity: {
            const links = [...item.links || []];
            return api.getDetailInfo(item.type, item.ref)
                .then(detailedItem => Object.assign({}, detailedItem, item, { links }));
        }
        case project_1.ItemType.CSVFile:
            return api.fs().readTextFile(item.path)
                .then(rawCsv => (0, SampleDataUtil_1.countEntries)(rawCsv))
                .catch(() => 0)
                .then(count => ({ ...item, entryCount: count }));
        default:
            return Promise.resolve(item);
    }
});
exports.populateItemsInfo = populateItemsInfo;
const UiItemTypes = new Set([project_1.ItemType.MDKApplication, project_1.ItemType.UI5Application]);
const parseModuleLinks = (mods) => {
    mods.forEach(mod => {
        switch (mod.type) {
            case project_1.ModuleType.CAP:
                if (mod.path.startsWith('db')) {
                    mod.links = mods.filter(depMod => depMod.path.startsWith('srv'));
                }
                else if (mod.path.startsWith('srv')) {
                    const depUiApps = exports.entries.current
                        .filter(ent => ent.type === project_1.ItemType.CAPService)
                        .map(item => [...(0, DependencyResolver_1.getDirectDependenciesOf)(item)]
                        .filter(i => UiItemTypes.has(i.type)))
                        .flat();
                    if (!depUiApps.length) {
                        break;
                    }
                    const depUiAppModulePaths = new Set(depUiApps.map(app => { var _a; return (_a = /(app\/.+?)\//.exec(app.path)) === null || _a === void 0 ? void 0 : _a[1]; }).filter(p => p));
                    mod.links = mods.filter(depMod => depUiAppModulePaths.has(depMod.path));
                }
                break;
            default:
                break;
        }
    });
};
exports.parseModuleLinks = parseModuleLinks;
const fetchEntries = (watcher) => watcher
    ? ProjectClient_1.ProjectClient.projApi
        .then(api => Promise.all([
        api.readItems(undefined, (0, loggerImpl_1.getLogger)())
            .then(items => Promise.all((0, exports.populateItemsInfo)(items, api))),
        api.getModulesInfo((0, loggerImpl_1.getLogger)())
    ]))
        .then(async ([items, modules]) => {
        const projApi = await ProjectClient_1.ProjectClient.projApi;
        exports.entries.current = items;
        (0, notify_1.notify)((0, exports.groupCount)(items), notify_1.NotifyDest.InfoLog);
        const { dashboard, transformedList } = (0, Transformer_1.transformAllItems)(items);
        exports.cockpitData.current = dashboard;
        (0, exports.refreshChangedMdkApps)();
        (0, DependencyResolver_1.refreshItemDependencyMap)(transformedList, projApi.fs().basePath);
        (0, exports.parseModuleLinks)(modules);
        exports.linkedModules.current = modules;
        exports.moduleTypeMap.current = modules.reduce((map, mod) => {
            if (!map.has(mod.type)) {
                map.set(mod.type, []);
            }
            map.get(mod.type).push(mod);
            return map;
        }, new Map());
        return exports.cockpitData.current;
    })
        .catch(err => {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
        return exports.cockpitData.current;
    })
    : Promise.resolve(exports.cockpitData.current);
exports.fetchEntries = fetchEntries;
exports.fetchEntriesDebounced = (0, Util_1.debounce)(exports.fetchEntries);
const UIAppItemTypes = new Set([project_1.ItemType.UI5Application, project_1.ItemType.MDKApplication]);
const getUIApps = () => exports.entries.current.filter(en => UIAppItemTypes.has(en.type));
exports.getUIApps = getUIApps;
exports.changedMdkApps = { current: {} };
const refreshChangedMdkApps = () => {
    if (!exports.entries.current.length) {
        return {};
    }
    const changedMdkAppMap = {};
    const mdkApps = exports.entries.current.filter(i => i.type === project_1.ItemType.MDKApplication);
    for (const mdkApp of mdkApps) {
        const mdkBundlePath = (0, path_1.join)((0, Workspace_1.rootFolder)().uri.fsPath, (0, path_1.dirname)(mdkApp.path), "Web/MDKModule/webapp/bundle.js");
        try {
            const appBundleTime = (0, fs_1.statSync)(mdkBundlePath).mtime;
            for (const item of exports.entries.current) {
                if (!item.path.startsWith((0, path_1.dirname)(mdkApp.path))) {
                    continue;
                }
                const fullPath = (0, path_1.join)((0, Workspace_1.rootFolder)().uri.fsPath, item.path);
                try {
                    if ((0, fs_1.statSync)(fullPath).mtime > appBundleTime) {
                        changedMdkAppMap[mdkApp.path] = true;
                        break;
                    }
                }
                catch (err) {
                    changedMdkAppMap[mdkApp.path] = true;
                    break;
                }
            }
        }
        catch (err) {
            changedMdkAppMap[mdkApp.path] = true;
            continue;
        }
    }
    return exports.changedMdkApps.current = changedMdkAppMap;
};
exports.refreshChangedMdkApps = refreshChangedMdkApps;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const triggerValidationFor = (events, files, projApi) => {
    if (!events.length || events.length !== files.length) {
        return;
    }
    const validatableFiles = files.filter((file, idx) => events[idx] !== 'unlink');
    const deduplicatedFiles = Array.from(new Set(validatableFiles));
    deduplicatedFiles.forEach(file => (0, Validator_1.validate)(file, projApi));
};
exports.triggerValidationFor = triggerValidationFor;
const dispatchFileChanges = (api) => {
    return Promise.all([
        ProjectClient_1.ProjectClient.watcher,
        ProjectClient_1.ProjectClient.projApi
    ]).then(([watcher, projApi]) => {
        if (!watcher || !projApi) {
            return;
        }
        watcher.on('updated', () => {
            (0, exports.refreshHomePage)(api, watcher);
            (0, LifeCycleClient_1.notifyCountChanges)(api, projApi.fs().rootPath);
        });
    });
};
exports.dispatchFileChanges = dispatchFileChanges;
const dispatchTaskStateHook = (api) => {
    const notifyTaskState = (name) => {
        api.post(RpcApi_1.UIEndPoint.notifyTaskState, [name, (0, states_1.fetchStateCacheFor)(name)]);
    };
    return [states_1.taskStateHook.event((name) => notifyTaskState(name))];
};
exports.dispatchTaskStateHook = dispatchTaskStateHook;
const refreshHomePage = (api, watcher) => {
    if (watcher) {
        return (0, exports.fetchEntriesDebounced)(watcher).finally(() => {
            api.post(RpcApi_1.UIEndPoint.notifyAllItems, [exports.cockpitData.current]);
            ProjectClient_1.ProjectClient.getProjInfo(true)
                .then(projInfo => api.post(RpcApi_1.UIEndPoint.notifyProjInfo, [projInfo]))
                .catch(err => {
                (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
            });
        });
    }
    else {
        return api.post(RpcApi_1.UIEndPoint.notifyAllItems, [(0, getEmptyData_1.getEmptyData)()]);
    }
};
exports.refreshHomePage = refreshHomePage;
const dispatchWorkspaceChanges = (api) => {
    ProjectClient_1.ProjectClient.workspaceApi.onWorkspaceChanged(() => ProjectClient_1.ProjectClient.projApis
        .then(apis => {
        if (apis.length) {
            return;
        }
        ProjectClient_1.ProjectClient.setApis();
        (0, exports.dispatchFileChanges)(api);
    }));
    ProjectClient_1.ProjectClient.workspaceApi.startWatch();
};
exports.dispatchWorkspaceChanges = dispatchWorkspaceChanges;
//# sourceMappingURL=CockpitApiImpl.js.map