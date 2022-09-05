"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EraseResult = exports.EditableType = exports.ErasableType = exports.itemType2editorTypes = exports.EditorType = exports.category2CreationType = exports.CreationType = exports.CrudOps = void 0;
const ItemType_1 = require("../artifact-management/definitions/ItemType");
const CockpitCategories_1 = require("./CockpitCategories");
var CrudOps;
(function (CrudOps) {
    CrudOps[CrudOps["Create"] = 0] = "Create";
    CrudOps[CrudOps["Edit"] = 1] = "Edit";
    CrudOps[CrudOps["Delete"] = 2] = "Delete";
})(CrudOps = exports.CrudOps || (exports.CrudOps = {}));
var CreationType;
(function (CreationType) {
    CreationType["UI"] = "UI";
    CreationType["Workflow"] = "Workflow";
    CreationType["Service"] = "Service";
    CreationType["DataModel"] = "DataModel";
    CreationType["ExternalService"] = "ExternalService";
    CreationType["SampleData"] = "SampleData";
    CreationType["SecurityRole"] = "SecurityRole";
})(CreationType = exports.CreationType || (exports.CreationType = {}));
exports.category2CreationType = new Map([
    [CockpitCategories_1.CockpitCategories.UI, CreationType.UI],
    [CockpitCategories_1.CockpitCategories.Workflow, CreationType.Workflow],
    [CockpitCategories_1.CockpitCategories.Service, CreationType.Service],
    [CockpitCategories_1.CockpitCategories.DataModel, CreationType.DataModel],
    [CockpitCategories_1.CockpitCategories.ExternalService, CreationType.ExternalService],
    [CockpitCategories_1.CockpitCategories.SampleData, CreationType.SampleData],
    [CockpitCategories_1.CockpitCategories.SecurityRole, CreationType.SecurityRole],
]);
var EditorType;
(function (EditorType) {
    EditorType["DataModelEditor"] = "DataModel Editor";
    EditorType["ServiceEditor"] = "Service Editor";
    EditorType["AuthorizationEditor"] = "Authorization Editor";
    EditorType["MdkPageMap"] = "MDK Page Map";
    EditorType["FePageMap"] = "Fiori Elements Page Map";
    EditorType["SampleDataEditor"] = "Sample Data Editor";
    EditorType["WorkflowEditor"] = "Workflow Editor";
})(EditorType = exports.EditorType || (exports.EditorType = {}));
exports.itemType2editorTypes = new Map([
    [ItemType_1.ItemType.CDSEntity, [EditorType.DataModelEditor]],
    [ItemType_1.ItemType.ODataV4ServiceEntity, [EditorType.ServiceEditor, EditorType.AuthorizationEditor]],
    [ItemType_1.ItemType.MDKApplication, [EditorType.MdkPageMap]],
    [ItemType_1.ItemType.UI5Application, [EditorType.FePageMap]],
    [ItemType_1.ItemType.CSVFile, [EditorType.SampleDataEditor]],
    [ItemType_1.ItemType.Workflow, [EditorType.WorkflowEditor]],
    [ItemType_1.ItemType.SecurityRole, [EditorType.AuthorizationEditor]],
]);
var ErasableType;
(function (ErasableType) {
    ErasableType["CDSEntity"] = "Entity";
    ErasableType["CDSProjection"] = "Projection";
    ErasableType["CSVFile"] = "CSV";
    ErasableType["MDKApplication"] = "MdkApplication";
    ErasableType["FioriElementsApplication"] = "FioriElementApplication";
    ErasableType["WorkflowModel"] = "WorkflowModel";
    ErasableType["SecurityRole"] = "SecurityRole";
})(ErasableType = exports.ErasableType || (exports.ErasableType = {}));
var EditableType;
(function (EditableType) {
    EditableType["CDSEntity"] = "Entity";
    EditableType["CDSProjection"] = "Projection";
    EditableType["CSVFile"] = "CSV";
    EditableType["MDKApplication"] = "MdkApplication";
    EditableType["FioriElementsApplication"] = "FioriElementApplication";
    EditableType["WorkflowModel"] = "WorkflowModel";
    EditableType["SecurityRole"] = "SecurityRole";
})(EditableType = exports.EditableType || (exports.EditableType = {}));
var EraseResult;
(function (EraseResult) {
    EraseResult[EraseResult["SUCCESS"] = 0] = "SUCCESS";
    EraseResult[EraseResult["FAILURE"] = 1] = "FAILURE";
})(EraseResult = exports.EraseResult || (exports.EraseResult = {}));
//# sourceMappingURL=CommonCrud.js.map