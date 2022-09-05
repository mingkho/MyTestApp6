"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const CDSEntCreator_1 = require("../../../../libs/EntityCreater/CDSEntCreator");
const ExternalSvcImporter_1 = require("../../../../libs/EntityCreater/ExternalSvcImporter");
const ODataSvcCreator_1 = require("../../../../libs/EntityCreater/ODataSvcCreator");
const SampleDataAdapter_1 = require("../../../../libs/EntityCreater/SampleDataAdapter");
const UICreator_1 = require("../../../../libs/EntityCreater/UICreator");
const WorkflowCreator_1 = require("../../../../libs/EntityCreater/WorkflowCreator");
const Workspace = require("../../../../libs/Workspace");
const EntityCreaterIndex = require("../../../../libs/EntityCreater");
describe('EntityCreaterIndex', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    afterEach(() => sandbox.restore());
    describe('getEntityCreator', () => {
        it('exits if no workspace', () => {
            sandbox.stub(Workspace, 'noWorkspace').returns(true);
            const inst = EntityCreaterIndex.getEntityCreator('');
            expect(inst.exec()).toBe('ignore');
        });
        it('can make correct response according to arguments', () => {
            sandbox.stub(Workspace, 'noWorkspace').returns(false);
            expect(EntityCreaterIndex.getEntityCreator('UI')).toBeInstanceOf(UICreator_1.UICreator);
            expect(EntityCreaterIndex.getEntityCreator('Workflow')).toBeInstanceOf(WorkflowCreator_1.WorkflowCreator);
            expect(EntityCreaterIndex.getEntityCreator('Service')).toBeInstanceOf(ODataSvcCreator_1.ODataSvcCreator);
            expect(EntityCreaterIndex.getEntityCreator('DataModel')).toBeInstanceOf(CDSEntCreator_1.CDSEntCreator);
            expect(EntityCreaterIndex.getEntityCreator('ExternalService')).toBeInstanceOf(ExternalSvcImporter_1.ExternalSvcImporter);
            expect(EntityCreaterIndex.getEntityCreator('SampleData')).toBeInstanceOf(SampleDataAdapter_1.SampleDataAdapter);
            expect(() => EntityCreaterIndex.getEntityCreator('foobar')).toThrowError('no such type of creator');
        });
    });
});
//# sourceMappingURL=EntityCreaterIndex.spec.js.map