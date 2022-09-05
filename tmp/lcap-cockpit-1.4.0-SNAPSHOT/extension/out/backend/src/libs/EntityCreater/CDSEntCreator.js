"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDSEntCreator = void 0;
const CDSGraphicalModelerApi_1 = require("../CommonCrudLibs/CDSGraphicalModelerApi");
const openWithCdsGM_1 = require("../EntityEditor/openWithCdsGM");
const Workspace_1 = require("../Workspace");
const notify_1 = require("../logger/notify");
const ProjectClient_1 = require("../ProjectClient");
const CAPUtil_1 = require("./CAPUtil");
class CDSEntCreator {
    async exec() {
        return ProjectClient_1.ProjectClient.getProjInfo()
            .then(proj => {
            if (!proj.hasWorkspace || !proj.projInfo) {
                return;
            }
            return (0, CAPUtil_1.prepareDbCds)(proj.projInfo.name);
        })
            .then(cdsAbsPath => (0, openWithCdsGM_1.openWithCdsGM)([
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (0, Workspace_1.from)([cdsAbsPath], true),
            {
                action: CDSGraphicalModelerApi_1.ActionType.Create,
                targetType: CDSGraphicalModelerApi_1.TargetType.Entity,
                targetName: ''
            }
        ]))
            .catch(err => (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox));
    }
}
exports.CDSEntCreator = CDSEntCreator;
//# sourceMappingURL=CDSEntCreator.js.map