"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UICreator = exports.isInternalService = exports.isWorkflowTaskEnabled = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const project_1 = require("project");
const project_2 = require("project");
const path_1 = require("path");
const vscode_1 = require("vscode");
const Workspace_1 = require("../Workspace");
const notify_1 = require("../logger/notify");
const ProjectClient_1 = require("../ProjectClient");
const CockpitApiImpl_1 = require("../CockpitApi/CockpitApiImpl");
const Panel_1 = require("../Panel");
const FAIL_GENERATE_SERVICE_INFO = 'Failed to generate service info';
const FAIL_UPDATE_EDMX = 'Failed to update service edmx';
const isWorkflowTaskEnabled = (item) => { var _a; return item.type === project_2.ItemType.ODataV4ServiceEntity && ((_a = item.tags) === null || _a === void 0 ? void 0 : _a.includes(project_2.Tag.WorkflowTaskEnabled)); };
exports.isWorkflowTaskEnabled = isWorkflowTaskEnabled;
const isInternalService = (item) => !item.external && item.type === project_2.ItemType.CAPService;
exports.isInternalService = isInternalService;
class UICreator {
    exec() {
        const projPath = (0, Workspace_1.rootFolder)().uri.fsPath;
        return this.updateServiceInfo(projPath)
            .then(({ svcInfos, workflowTaskEnabledSvcEnts }) => {
            (0, notify_1.notify)('Fetched service info...', notify_1.NotifyDest.InfoLog);
            const loadYeomanUIOptions = {
                filter: { types: ["lcap"] },
                messages: {
                    panel_title: "New UI Application",
                    yeoman_ui_title: "Create New UI Application"
                },
                generator: "@ext-lcapvsc-npm-dev/lcap:app",
                data: {
                    "type": "lcap",
                    "target": (0, path_1.join)(projPath, 'app'),
                    "service": svcInfos,
                    workflowTaskEnabledSvcEnts
                }
            };
            if (Panel_1.webviewMeta.panel && Panel_1.webviewMeta.panel.viewColumn) {
                loadYeomanUIOptions.viewColumn = Panel_1.webviewMeta.panel.viewColumn;
            }
            return vscode_1.commands.executeCommand("loadYeomanUI", loadYeomanUIOptions);
        })
            .catch(err => (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox));
    }
    updateServiceInfo(projPath) {
        (0, notify_1.notify)('Updating service info...', notify_1.NotifyDest.InfoLog);
        const internalServices = CockpitApiImpl_1.entries.current.filter(exports.isInternalService);
        const intSvcPaths = new Set(internalServices.map(svc => svc.path));
        return ProjectClient_1.ProjectClient.projApi
            .then(projApi => projApi
            ? Promise.all([
                project_1.ServiceInfo.list(projApi).then(svcInfos => svcInfos.filter(info => intSvcPaths.has(info.sourcePath))),
                Promise.resolve(CockpitApiImpl_1.entries.current.filter(exports.isWorkflowTaskEnabled))
            ])
            : Promise.reject(FAIL_GENERATE_SERVICE_INFO))
            .then(([svcInfos, svcEnts]) => {
            /* istanbul ignore if */
            if (!svcInfos) {
                (0, notify_1.notify)(FAIL_GENERATE_SERVICE_INFO, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
                return Promise.reject(FAIL_GENERATE_SERVICE_INFO);
            }
            if (!svcInfos.length) {
                return Promise.reject('There\'s no service info listed. Creation canceled.');
            }
            return Promise
                .all(svcInfos.map(svcInfo => project_1.ServiceInfo.getEdmx((0, path_1.join)(projPath, svcInfo.sourcePath), svcInfo.name).then(p => {
                svcInfo.edmxPath = p;
                svcInfo.path = svcInfo.path.endsWith('/')
                    ? svcInfo.path
                    : `${svcInfo.path}/`;
            }).catch(err => {
                (0, notify_1.notify)(FAIL_UPDATE_EDMX, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
                (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
                return Promise.reject(FAIL_UPDATE_EDMX);
            })))
                .then(() => ({ svcInfos, workflowTaskEnabledSvcEnts: svcEnts.map(ent => ent.ref) }))
                .catch(err => {
                (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
                return Promise.reject(err);
            });
        });
    }
}
exports.UICreator = UICreator;
//# sourceMappingURL=UICreator.js.map