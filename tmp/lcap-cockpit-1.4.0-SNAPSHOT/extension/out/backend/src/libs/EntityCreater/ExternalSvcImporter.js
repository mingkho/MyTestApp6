"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalSvcImporter = void 0;
const ProjectClient_1 = require("../ProjectClient");
const vscode_1 = require("vscode");
const notify_1 = require("../logger/notify");
const OPEN_HOME_ACTION = {
    actionType: 'COMMAND',
    name: 'lcap.home.openCockpit',
};
class ExternalSvcImporter {
    exec() {
        const svcCenterExt = vscode_1.extensions.getExtension('sapse.vscode-wing-service-center');
        if (!svcCenterExt) {
            (0, notify_1.notify)('Couldn\'t find service center', notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
            return Promise.reject();
        }
        const pipe$ = svcCenterExt.isActive ? Promise.resolve() : svcCenterExt.activate();
        return pipe$
            .then(() => ProjectClient_1.ProjectClient.getProjInfo())
            .then(proj => {
            if (!proj.hasWorkspace || !proj.projInfo) {
                return;
            }
            const projPath = proj.projInfo.path;
            vscode_1.commands.executeCommand('sapSystemSection.focus');
            return vscode_1.commands.executeCommand('sapServiceCenter.addServiceToProject', {
                projectType: 'CAP',
                projectPath: projPath.endsWith('/') ? projPath : `${projPath}/`,
                isNonInteractive: true,
                onAfterAddServiceAction: OPEN_HOME_ACTION
            });
        })
            .then(undefined, err => (0, notify_1.notify)(err, notify_1.NotifyDest.ErrMsgBox, notify_1.NotifyDest.ErrLog));
    }
}
exports.ExternalSvcImporter = ExternalSvcImporter;
//# sourceMappingURL=ExternalSvcImporter.js.map