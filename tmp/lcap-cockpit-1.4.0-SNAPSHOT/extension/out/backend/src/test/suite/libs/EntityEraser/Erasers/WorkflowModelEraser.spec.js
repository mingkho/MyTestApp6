"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const Erasers_1 = require("../../../../../libs/EntityEraser/Erasers");
const CommonCrud_1 = require("../../../../../../../common/src/CommonCrud");
const vscode_1 = require("vscode");
describe('WorkflowModelEraser', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    const inst = (0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.WorkflowModel);
    it('can erase', async () => {
        const execStub = sandbox.stub(vscode_1.commands, 'executeCommand');
        execStub.returns(Promise.resolve({ res: CommonCrud_1.EraseResult.SUCCESS }));
        await inst.erase({}).then(res => expect(res).toBeTruthy());
        execStub.reset();
        execStub.returns(Promise.reject());
        await inst.erase({}).catch(res => expect(res).toBeTruthy());
    });
});
//# sourceMappingURL=WorkflowModelEraser.spec.js.map