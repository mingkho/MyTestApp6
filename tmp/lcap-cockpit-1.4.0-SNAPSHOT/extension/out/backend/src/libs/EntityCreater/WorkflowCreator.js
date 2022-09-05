"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowCreator = void 0;
const path_1 = require("path");
const project_1 = require("project");
const vscode_1 = require("vscode");
const loggerImpl_1 = require("../logger/loggerImpl");
const notify_1 = require("../logger/notify");
const ProjectClient_1 = require("../ProjectClient");
const Workspace_1 = require("../Workspace");
class WorkflowCreator {
    async exec() {
        return ProjectClient_1.ProjectClient.projApi
            .then(projApi => projApi === null || projApi === void 0 ? void 0 : projApi.read((0, loggerImpl_1.getLogger)()))
            .then(projModInst => {
            if (projModInst) {
                for (const mod of projModInst.modules) {
                    if (mod.type === project_1.ModuleType.Workflow) {
                        const projPath = (0, Workspace_1.rootFolder)().uri.fsPath;
                        const workflowPath = (0, path_1.join)(projPath, mod.path);
                        return vscode_1.commands.executeCommand("loadYeomanUI", {
                            filter: { types: ["lcap"] },
                            messages: {
                                panel_title: "New Workflow",
                                yeoman_ui_title: "Create Workflow"
                            },
                            generator: "@ext-lcapvsc-npm-dev/lcap:app",
                            data: {
                                "workflow": workflowPath
                            }
                        });
                    }
                }
                throw new Error('No workflow modules found in the LCAP workspace');
            }
            else {
                throw new Error('No LCAP project found');
            }
        })
            .catch(err => (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox));
    }
}
exports.WorkflowCreator = WorkflowCreator;
//# sourceMappingURL=WorkflowCreator.js.map