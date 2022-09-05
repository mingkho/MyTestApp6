"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eraseEntity = void 0;
const vscode_1 = require("vscode");
const Erasers_1 = require("./Erasers");
const project_1 = require("project");
const notify_1 = require("../logger/notify");
const Workspace_1 = require("../Workspace");
const CommonCrud_1 = require("../../../../common/src/CommonCrud");
const DependencyResolver_1 = require("../DependencyResolver");
const i18n_1 = require("../../../../common/src/i18n");
const E_NOT_SUPPORT_DEL = 'This type of deletion is not supported yet';
const E_HAS_DEPENDENCY = (deps) => `This item has dependencies which might be affected: ${(0, i18n_1.stringifyDepsOf)(deps)}`;
const E_DEL_FAILURE = (itemName) => `Deleting item ${itemName} failed.`;
const itemErasableMap = new Map([
    [project_1.ItemType.CSVFile, CommonCrud_1.ErasableType.CSVFile],
    [project_1.ItemType.MDKApplication, CommonCrud_1.ErasableType.MDKApplication],
    [project_1.ItemType.CDSEntity, CommonCrud_1.ErasableType.CDSEntity],
    [project_1.ItemType.ODataV4ServiceEntity, CommonCrud_1.ErasableType.CDSProjection],
    [project_1.ItemType.UI5Application, CommonCrud_1.ErasableType.FioriElementsApplication],
    [project_1.ItemType.Workflow, CommonCrud_1.ErasableType.WorkflowModel],
    [project_1.ItemType.SecurityRole, CommonCrud_1.ErasableType.SecurityRole],
]);
const eraseEntity = async (item, force = false) => {
    const targetType = itemErasableMap.get(item.type);
    if (targetType === undefined) {
        (0, notify_1.notify)(E_NOT_SUPPORT_DEL, notify_1.NotifyDest.ErrMsgBox);
        throw new Error(E_NOT_SUPPORT_DEL);
    }
    const dependencies = (0, DependencyResolver_1.getAllDependenciesOf)(item);
    if (dependencies.length && !force) {
        const errMsg = E_HAS_DEPENDENCY(dependencies);
        (0, notify_1.notify)(errMsg, notify_1.NotifyDest.ErrMsgBox);
        throw new Error(errMsg);
    }
    const uri = (0, Workspace_1.from)([item.path]);
    return vscode_1.commands.executeCommand(Erasers_1.LCAP_CRUD_DELETE_CMD, { targetType, uri, item })
        .then(res => res, err => {
        if (!err) {
            return { res: CommonCrud_1.EraseResult.SUCCESS };
        }
        const { label, itemType } = (0, i18n_1.stringifyItem)(item);
        (0, notify_1.notify)(E_DEL_FAILURE(`${label} ${itemType}`), notify_1.NotifyDest.ErrMsgBox, notify_1.NotifyDest.ErrLog);
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
        return { res: CommonCrud_1.EraseResult.FAILURE };
    });
};
exports.eraseEntity = eraseEntity;
//# sourceMappingURL=EraseRequest.js.map