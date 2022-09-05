"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ODataSvcCreator = void 0;
const CDSGraphicalModelerApi_1 = require("../CommonCrudLibs/CDSGraphicalModelerApi");
const openWithCdsGM_1 = require("../EntityEditor/openWithCdsGM");
const Workspace_1 = require("../Workspace");
const notify_1 = require("../logger/notify");
const CAPUtil_1 = require("./CAPUtil");
const ProjectClient_1 = require("../ProjectClient");
class ODataSvcCreator {
    exec(item) {
        const promise = !item || CDSGraphicalModelerApi_1.Projectionables.has(item.type)
            ? ProjectClient_1.ProjectClient.getProjInfo()
            : Promise.reject('This type of item is not supported for service entity creation');
        return promise
            .then(proj => {
            if (!proj.hasWorkspace || !proj.projInfo) {
                return;
            }
            return Promise
                .all([
                (0, CAPUtil_1.prepareDbCds)(proj.projInfo.name, item === null || item === void 0 ? void 0 : item.path, item === null || item === void 0 ? void 0 : item.external),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                (item === null || item === void 0 ? void 0 : item.external) ? (0, CAPUtil_1.prepSrvCdsForExtEnt)(item.serviceName) : (0, CAPUtil_1.prepareSrvCds)()
            ])
                .then(([dbCdsPath, srvCdsPath]) => {
                (0, openWithCdsGM_1.openWithCdsGM)([
                    (0, Workspace_1.from)([srvCdsPath], true),
                    {
                        action: CDSGraphicalModelerApi_1.ActionType.Create,
                        targetType: CDSGraphicalModelerApi_1.TargetType.Projection,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        context: (0, CAPUtil_1.getDefaultSrvName)(proj.projInfo.name),
                        targetName: '',
                        importFileFullPath: dbCdsPath,
                        baseType: item ? (0, CDSGraphicalModelerApi_1.getQualifiedNameOf)(item) : ''
                    }
                ]);
            });
        })
            .catch(err => (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox));
    }
}
exports.ODataSvcCreator = ODataSvcCreator;
//# sourceMappingURL=ODataSvcCreator.js.map