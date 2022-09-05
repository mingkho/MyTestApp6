"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemType = void 0;
/**
 * This is a initial version. Please use this enum structure and don't use the values in your code.
 * @todo Review entity type values
 */
exports.ItemType = Object.freeze({
    UI5Application: 'com.sap.ui/Application',
    UI5Component: 'com.sap.ui/Component',
    UI5View: 'com.sap.ui/View',
    MDKApplication: 'com.sap.mdk/Application',
    MdkAction: 'com.sap.mdk/Action',
    MDKGlobal: 'com.sap.mdk/Global',
    MDKI18n: 'com.sap.mdk/I18n',
    MDKImage: 'com.sap.mdk/Image',
    MDKPage: 'com.sap.mdk/Page',
    MDKRule: 'com.sap.mdk/Rule',
    MDKService: 'com.sap.mdk/Service',
    MDKStyle: 'com.sap.mdk/Style',
    MDKTaskUI: 'com.sap.mdk/TaskUI',
    CSVFile: 'mimetype/csv',
    CAPService: 'com.sap.cap/Service',
    CAPServer: 'comp.sap.cap/Server',
    CDSEntity: 'com.sap.cds/Entity',
    ODataV4ServiceEntity: 'org.oasis-open.odata/Entity',
    Workflow: 'com.sap.workflow/Model',
    WorkflowScript: 'com.sap.workflow/Script',
    WorkflowMailTemplate: 'com.sap.workflow/MailTemplate',
    WorkflowSampleData: 'com.sap.workflow/SampleData',
    NavigationTarget: 'com.sap.ui/NavigationTarget',
    SecurityRole: 'com.sap.security/Role',
});
//# sourceMappingURL=ItemType.js.map