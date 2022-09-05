"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CDSEntEditor_1 = require("../../../../libs/EntityEditor/CDSEntEditor");
const FioriElmEditor_1 = require("../../../../libs/EntityEditor/FioriElmEditor");
const ODataSvcEditor_1 = require("../../../../libs/EntityEditor/ODataSvcEditor");
const SampleDataEditor_1 = require("../../../../libs/EntityEditor/SampleDataEditor");
const WorkflowEditor_1 = require("../../../../libs/EntityEditor/WorkflowEditor");
const AuthorizationEditor_1 = require("../../../../libs/EntityEditor/AuthorizationEditor");
const EntityEditor_1 = require("../../../../libs/EntityEditor");
const MDKAppEditor_1 = require("../../../../libs/EntityEditor/MDKAppEditor");
const CommonCrud_1 = require("../../../../../../common/src/CommonCrud");
const sinon_1 = require("sinon");
const Workspace = require("../../../../libs/Workspace");
describe('EntityEditorIndex', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can exec corresponding editors', () => {
        expect((0, EntityEditor_1.getEntityEditor)(CommonCrud_1.EditorType.AuthorizationEditor)).toBeInstanceOf(AuthorizationEditor_1.AuthorizationEditor);
        expect((0, EntityEditor_1.getEntityEditor)(CommonCrud_1.EditorType.MdkPageMap)).toBeInstanceOf(MDKAppEditor_1.default);
        expect((0, EntityEditor_1.getEntityEditor)(CommonCrud_1.EditorType.FePageMap)).toBeInstanceOf(FioriElmEditor_1.default);
        expect((0, EntityEditor_1.getEntityEditor)(CommonCrud_1.EditorType.WorkflowEditor)).toBeInstanceOf(WorkflowEditor_1.default);
        expect((0, EntityEditor_1.getEntityEditor)(CommonCrud_1.EditorType.DataModelEditor)).toBeInstanceOf(CDSEntEditor_1.default);
        expect((0, EntityEditor_1.getEntityEditor)(CommonCrud_1.EditorType.ServiceEditor)).toBeInstanceOf(ODataSvcEditor_1.default);
        expect((0, EntityEditor_1.getEntityEditor)(CommonCrud_1.EditorType.SampleDataEditor)).toBeInstanceOf(SampleDataEditor_1.default);
        expect(() => (0, EntityEditor_1.getEntityEditor)('foobar')).toThrowError();
    });
    it('can exec edit action', async () => {
        try {
            await (0, EntityEditor_1.edit)('foobar', undefined);
        }
        catch (error) {
            expect(error).toBeTruthy();
        }
        sandbox.stub(Workspace, 'from');
        const mdkEditSpy = sandbox.stub(MDKAppEditor_1.default.prototype, 'exec');
        await (0, EntityEditor_1.edit)(CommonCrud_1.EditorType.MdkPageMap, { path: 'app' });
        expect(mdkEditSpy.called).toBe(true);
    });
});
//# sourceMappingURL=index.spec.js.map