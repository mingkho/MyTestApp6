"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const commonCDSErase_1 = require("../../../../../libs/EntityEraser/Erasers/commonCDSErase");
const fake_1 = require("../../../../../test/mocks/fake");
const vscode_1 = require("vscode");
describe('commonCDSErase.spec', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can erase', async () => {
        const execStub = sandbox.stub(vscode_1.commands, 'executeCommand');
        await (0, commonCDSErase_1.commonCDSErase)(fake_1.fakeUri, '', '');
        expect(execStub.called).toBe(true);
    });
});
//# sourceMappingURL=commonCDSErase.spec.js.map