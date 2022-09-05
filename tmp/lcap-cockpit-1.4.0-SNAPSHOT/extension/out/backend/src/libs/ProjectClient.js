"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectClient = void 0;
const Workspace_1 = require("./Workspace");
const project_1 = require("project");
const notify_1 = require("./logger/notify");
const loggerImpl_1 = require("./logger/loggerImpl");
const CockpitApiImpl_1 = require("./CockpitApi/CockpitApiImpl");
const fs_1 = require("fs");
const path_1 = require("path");
const vscode_1 = require("vscode");
const AuthorizationEditorApi_1 = require("./CommonCrudLibs/AuthorizationEditorApi");
const ConfigWatcher_1 = require("./ShareClient/ConfigWatcher");
const LifeCycleClient_1 = require("./ShareClient/LifeCycleClient");
class ProjectClient {
    static setApis() {
        this.projApis = this.workspaceApi.getProjects().then(apis => apis).catch(err => {
            (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
            return [];
        });
        this.projApi = this.projApis.then(apis => apis[0]);
        this.hasProj = this.projApi.then(projApi => projApi
            ? projApi.read((0, loggerImpl_1.getLogger)(), project_1.Tag.Project).then(proj => (proj === null || proj === void 0 ? void 0 : proj.name) ? true : false)
            : false);
        this.projApi.then(api => {
            if (!api) {
                return;
            }
            (0, ConfigWatcher_1.watchGitConfig)(api, () => LifeCycleClient_1.lifecycleHook.emit(LifeCycleClient_1.LifecycleOp.OnConfigChange, api.fs().rootPath));
            if ((0, fs_1.existsSync)((0, path_1.join)(api.fs().rootPath, 'roles.roledefault'))) {
                return;
            }
            vscode_1.commands.executeCommand(AuthorizationEditorApi_1.LCAP_AUTH_EDITOR_CMD.SYNC_ROLE);
        }).catch(() => undefined);
        this.watcher = this.projApi.then(api => api ? api.watchItems() : undefined);
    }
    static getProjInfo(refresh = false) {
        const hasWorkspace = !(0, Workspace_1.noWorkspace)();
        return this.projApi.then(api => {
            var _a;
            if (!refresh && (!api || ((_a = CockpitApiImpl_1.projectStatus.current.projInfo) === null || _a === void 0 ? void 0 : _a.name))) {
                return Promise.resolve(CockpitApiImpl_1.projectStatus.current);
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return api.getProjectInfo()
                .then(projInfo => CockpitApiImpl_1.projectStatus.current = ({ projInfo, hasWorkspace }));
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getProjCdsRequiresEnv(cdsProfile = 'development') {
        return this.projApi
            .then(api => {
            const command = {
                win: 'cds.cmd',
                linux: 'cds',
                args: ['env', 'get', 'requires', '--profile', cdsProfile],
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                options: { cwd: api.fs().rootPath },
            };
            return project_1.Util.commandLineExecutor(command);
        })
            .then(env => env ? JSON.parse(env.replace(/\n/g, '')) : undefined);
    }
    static getEntityList(refresh = false) {
        return this.watcher.then(watcher => {
            if (!refresh &&
                (!watcher || (0, CockpitApiImpl_1.countCockpitEntries)(CockpitApiImpl_1.cockpitData.current) > 0)) {
                return CockpitApiImpl_1.cockpitData.current;
            }
            return (0, CockpitApiImpl_1.fetchEntriesDebounced)(watcher);
        });
    }
    static initAutoBuild(api) {
        return api.autoBuild().then(autoBuilder => {
            autoBuilder.start();
            return autoBuilder;
        });
    }
}
exports.ProjectClient = ProjectClient;
ProjectClient.workspaceApi = new project_1.WorkspaceImpl();
ProjectClient.setApis();
//# sourceMappingURL=ProjectClient.js.map