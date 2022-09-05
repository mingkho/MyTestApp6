"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const SampleDataEditor_1 = require("../../../../libs/EntityEditor/SampleDataEditor");
const fake_1 = require("../../../mocks/fake");
const vscode_1 = require("vscode");
describe('SampleDataEditor', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let inst;
    let cmdSpy;
    beforeEach(() => {
        inst = new SampleDataEditor_1.default();
        cmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
    });
    afterEach(() => sandbox.restore());
    it('can be executed', async () => {
        await inst.exec(fake_1.fakeUri);
        return expect(cmdSpy.called).toBe(true);
    });
});
//# sourceMappingURL=SampleDataEditor.spec.js.map