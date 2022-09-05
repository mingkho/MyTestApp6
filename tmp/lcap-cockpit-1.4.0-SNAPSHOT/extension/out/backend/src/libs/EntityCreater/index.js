"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAndGetCreationApi = exports.create = exports.getEntityCreator = exports.LCAP_CRUD_CREATE_CMD = void 0;
const vscode_1 = require("vscode");
const Workspace_1 = require("../Workspace");
const CDSEntCreator_1 = require("./CDSEntCreator");
const ExternalSvcImporter_1 = require("./ExternalSvcImporter");
const ODataSvcCreator_1 = require("./ODataSvcCreator");
const SampleDataAdapter_1 = require("./SampleDataAdapter");
const UICreator_1 = require("./UICreator");
const WorkflowCreator_1 = require("./WorkflowCreator");
const CommonCrud_1 = require("../../../../common/src/CommonCrud");
const i18n_1 = require("../../../../common/src/i18n");
const notify_1 = require("../logger/notify");
const SecurityRoleCreator_1 = require("./SecurityRoleCreator");
exports.LCAP_CRUD_CREATE_CMD = 'lcap.crud.create';
const creationChoiceLabels = [
    CommonCrud_1.CreationType.UI,
    CommonCrud_1.CreationType.Workflow,
    CommonCrud_1.CreationType.Service,
    CommonCrud_1.CreationType.DataModel,
    CommonCrud_1.CreationType.ExternalService,
    CommonCrud_1.CreationType.SampleData,
    CommonCrud_1.CreationType.SecurityRole,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
].map(tp => i18n_1.creationTypeLabelMap.get(tp));
const getEntityCreator = (type) => {
    if ((0, Workspace_1.noWorkspace)()) {
        return { exec: () => 'ignore' };
    }
    switch (type) {
        case CommonCrud_1.CreationType.UI:
            return new UICreator_1.UICreator();
        case CommonCrud_1.CreationType.Workflow:
            return new WorkflowCreator_1.WorkflowCreator();
        case CommonCrud_1.CreationType.Service:
            return new ODataSvcCreator_1.ODataSvcCreator();
        case CommonCrud_1.CreationType.DataModel:
            return new CDSEntCreator_1.CDSEntCreator();
        case CommonCrud_1.CreationType.ExternalService:
            return new ExternalSvcImporter_1.ExternalSvcImporter();
        case CommonCrud_1.CreationType.SampleData:
            return new SampleDataAdapter_1.SampleDataAdapter();
        case CommonCrud_1.CreationType.SecurityRole:
            return new SecurityRoleCreator_1.SecurityRoleCreator();
        default:
            throw new Error('no such type of creator');
    }
};
exports.getEntityCreator = getEntityCreator;
const LABELS = {
    QUICKPICK_TITLE: 'Please select a type to create',
    E_NOTYPE_SELECTED: 'Please select a type first before creation'
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const create = async (customArg, ...rest) => {
    if (!Array.isArray(customArg)) {
        customArg = [customArg];
    }
    const type = customArg[0];
    const selectionProc = !type
        ? Promise.resolve(vscode_1.window.showQuickPick(creationChoiceLabels, {
            canPickMany: false,
            title: LABELS.QUICKPICK_TITLE
        })).then(selectedLabel => !selectedLabel
            ? Promise.reject(LABELS.E_NOTYPE_SELECTED)
            : i18n_1.labelCreationTypeRevMap.get(selectedLabel))
        : Promise.resolve(type);
    return selectionProc
        .then(selectedType => (0, exports.getEntityCreator)(selectedType)
        .exec(...customArg.slice(1).concat(rest)))
        .catch(err => (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog));
};
exports.create = create;
const registerAndGetCreationApi = (ctx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
    ctx.subscriptions.push(vscode_1.commands.registerCommand(exports.LCAP_CRUD_CREATE_CMD, exports.create));
    return exports.create;
};
exports.registerAndGetCreationApi = registerAndGetCreationApi;
//# sourceMappingURL=index.js.map