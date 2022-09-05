"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const Erasers_1 = require("../../../../../libs/EntityEraser/Erasers");
const CommonCrud_1 = require("../../../../../../../common/src/CommonCrud");
const vscode_1 = require("vscode");
const fake_1 = require("../../../../../test/mocks/fake");
describe('FioriElementsAppEraser', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    const inst = (0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.FioriElementsApplication);
    it('can erase', async () => {
        const execStub = sandbox.stub(vscode_1.commands, 'executeCommand');
        execStub.returns(Promise.resolve());
        await inst.erase(fake_1.fakeUri).then(res => expect(res).toBeTruthy());
        execStub.reset();
        execStub.returns(Promise.reject());
        await inst.erase(fake_1.fakeUri).catch(res => expect(res).toBeTruthy());
    });
});
//# sourceMappingURL=FioriElementsAppEraser.spec.js.map