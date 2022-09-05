"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.getEntityEditor = void 0;
const CommonCrud_1 = require("../../../../common/src/CommonCrud");
const notify_1 = require("../logger/notify");
const Workspace_1 = require("../Workspace");
const AuthorizationEditor_1 = require("./AuthorizationEditor");
const CDSEntEditor_1 = require("./CDSEntEditor");
const FioriElmEditor_1 = require("./FioriElmEditor");
const MDKAppEditor_1 = require("./MDKAppEditor");
const ODataSvcEditor_1 = require("./ODataSvcEditor");
const SampleDataEditor_1 = require("./SampleDataEditor");
const WorkflowEditor_1 = require("./WorkflowEditor");
const getEntityEditor = (editorType) => {
    switch (editorType) {
        case CommonCrud_1.EditorType.AuthorizationEditor:
            return new AuthorizationEditor_1.AuthorizationEditor();
        case CommonCrud_1.EditorType.DataModelEditor:
            return new CDSEntEditor_1.default();
        case CommonCrud_1.EditorType.FePageMap:
            return new FioriElmEditor_1.default();
        case CommonCrud_1.EditorType.MdkPageMap:
            return new MDKAppEditor_1.default();
        case CommonCrud_1.EditorType.SampleDataEditor:
            return new SampleDataEditor_1.default();
        case CommonCrud_1.EditorType.ServiceEditor:
            return new ODataSvcEditor_1.default();
        case CommonCrud_1.EditorType.WorkflowEditor:
            return new WorkflowEditor_1.default();
        default:
            throw new Error("Such type of entry hasn't been supported yet");
    }
};
exports.getEntityEditor = getEntityEditor;
const edit = (editorType, item) => {
    try {
        const editor = (0, exports.getEntityEditor)(editorType);
        return editor.exec((0, Workspace_1.from)([item.path]), item);
    }
    catch (err) {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrMsgBox);
        return Promise.reject(err);
    }
};
exports.edit = edit;
//# sourceMappingURL=index.js.map