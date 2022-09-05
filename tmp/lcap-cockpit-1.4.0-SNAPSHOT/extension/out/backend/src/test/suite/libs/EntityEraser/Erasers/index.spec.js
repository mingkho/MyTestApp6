"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const vscode_1 = require("vscode");
const Workspace = require("../../../../../libs/Workspace");
const fake_1 = require("../../../../../test/mocks/fake");
const Erasers_1 = require("../../../../../libs/EntityEraser/Erasers");
const Erasers = require("../../../../../libs/EntityEraser/Erasers");
const CommonCrud_1 = require("../../../../../../../common/src/CommonCrud");
const CDSEntityEraser_1 = require("../../../../../libs/EntityEraser/Erasers/CDSEntityEraser");
const CSVFileEraser_1 = require("../../../../../libs/EntityEraser/Erasers/CSVFileEraser");
const MDKAppEraser_1 = require("../../../../../libs/EntityEraser/Erasers/MDKAppEraser");
const FioriElementsAppEraser_1 = require("../../../../../libs/EntityEraser/Erasers/FioriElementsAppEraser");
const CDSProjectionEraser_1 = require("../../../../../libs/EntityEraser/Erasers/CDSProjectionEraser");
const WorkflowModelEraser_1 = require("../../../../../libs/EntityEraser/Erasers/WorkflowModelEraser");
describe('Erasers', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    sandbox.stub(Workspace, 'noWorkspace').returns(false);
    sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
    it('can getEntityEraser', async () => {
        expect((0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.CSVFile)).toBeInstanceOf(CSVFileEraser_1.default);
        expect((0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.MDKApplication)).toBeInstanceOf(MDKAppEraser_1.default);
        expect((0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.FioriElementsApplication)).toBeInstanceOf(FioriElementsAppEraser_1.default);
        expect((0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.CDSEntity)).toBeInstanceOf(CDSEntityEraser_1.default);
        expect((0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.CDSProjection)).toBeInstanceOf(CDSProjectionEraser_1.default);
        expect((0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.WorkflowModel)).toBeInstanceOf(WorkflowModelEraser_1.default);
        expect((0, Erasers_1.getEntityEraser)('foobar').erase).toBeTruthy();
    });
    it('can erase', async () => {
        await (0, Erasers_1.erase)({ targetType: 'foobar' }).then(res => expect(res).toBeTruthy());
        sandbox.stub(Erasers, 'getEntityEraser')
            .returns({ erase: () => Promise.resolve({ res: CommonCrud_1.EraseResult.FAILURE, msg: 'msg' }) });
        await (0, Erasers_1.erase)({ targetType: 'foobar' }).catch(res => expect(res).toBeTruthy());
    });
    it('can registerAndGetDeletionApi', () => {
        const cmdSpy = sandbox.stub(vscode_1.commands, 'registerCommand');
        (0, Erasers_1.registerAndGetDeletionApi)({ subscriptions: [] });
        expect(cmdSpy.called).toBe(true);
    });
});
//# sourceMappingURL=index.spec.js.map