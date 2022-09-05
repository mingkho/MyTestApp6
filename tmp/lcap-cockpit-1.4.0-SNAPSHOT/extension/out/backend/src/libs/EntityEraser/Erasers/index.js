"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAndGetDeletionApi = exports.erase = exports.getEntityEraser = exports.LCAP_CRUD_DELETE_CMD = void 0;
const notify_1 = require("../../../libs/logger/notify");
const vscode_1 = require("vscode");
const CommonCrud_1 = require("../../../../../common/src/CommonCrud");
const CDSEntityEraser_1 = require("./CDSEntityEraser");
const CDSProjectionEraser_1 = require("./CDSProjectionEraser");
const CSVFileEraser_1 = require("./CSVFileEraser");
const FioriElementsAppEraser_1 = require("./FioriElementsAppEraser");
const MDKAppEraser_1 = require("./MDKAppEraser");
const WorkflowModelEraser_1 = require("./WorkflowModelEraser");
const SecurityRoleEraser_1 = require("./SecurityRoleEraser");
exports.LCAP_CRUD_DELETE_CMD = 'lcap.crud.delete';
const getEntityEraser = (targetType) => {
    switch (targetType) {
        case CommonCrud_1.ErasableType.CSVFile:
            return new CSVFileEraser_1.default();
        case CommonCrud_1.ErasableType.MDKApplication:
            return new MDKAppEraser_1.default();
        case CommonCrud_1.ErasableType.FioriElementsApplication:
            return new FioriElementsAppEraser_1.default();
        case CommonCrud_1.ErasableType.CDSEntity:
            return new CDSEntityEraser_1.default();
        case CommonCrud_1.ErasableType.CDSProjection:
            return new CDSProjectionEraser_1.default();
        case CommonCrud_1.ErasableType.WorkflowModel:
            return new WorkflowModelEraser_1.default();
        case CommonCrud_1.ErasableType.SecurityRole:
            return new SecurityRoleEraser_1.default();
        default:
            return { erase: () => Promise.resolve({ res: CommonCrud_1.EraseResult.SUCCESS }) };
    }
};
exports.getEntityEraser = getEntityEraser;
const erase = ({ targetType, uri, item }) => (0, exports.getEntityEraser)(targetType).erase(uri, targetType, item).then(result => {
    if (result.res === CommonCrud_1.EraseResult.SUCCESS) {
        return result;
    }
    (0, notify_1.notify)(result.msg, notify_1.NotifyDest.ErrMsgBox);
    return Promise.reject(result.msg);
});
exports.erase = erase;
const registerAndGetDeletionApi = (ctx) => {
    ctx.subscriptions.push(vscode_1.commands.registerCommand(exports.LCAP_CRUD_DELETE_CMD, exports.erase));
    return exports.erase;
};
exports.registerAndGetDeletionApi = registerAndGetDeletionApi;
//# sourceMappingURL=index.js.map