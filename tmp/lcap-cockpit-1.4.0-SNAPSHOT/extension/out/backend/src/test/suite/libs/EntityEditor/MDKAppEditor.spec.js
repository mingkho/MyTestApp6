"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const MDKAppEditor_1 = require("../../../../libs/EntityEditor/MDKAppEditor");
const vscode_1 = require("vscode");
const fake_1 = require("../../../mocks/fake");
describe('MDKAppEditor', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let inst;
    let cmdSpy;
    beforeEach(() => {
        inst = new MDKAppEditor_1.default();
        cmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
    });
    afterEach(() => sandbox.restore());
    it('can be executed', async () => {
        await inst.exec(fake_1.fakeUri);
        return expect(cmdSpy.called).toBe(true);
    });
});
//# sourceMappingURL=MDKAppEditor.spec.js.map