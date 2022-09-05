"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const FioriElmEditor_1 = require("../../../../libs/EntityEditor/FioriElmEditor");
const vscode_1 = require("vscode");
const fake_1 = require("../../../mocks/fake");
describe('FioriElmEditor', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let inst;
    let cmdSpy;
    beforeEach(() => {
        inst = new FioriElmEditor_1.default();
        cmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
    });
    afterEach(() => sandbox.restore());
    it('can be executed', async () => {
        await inst.exec(fake_1.fakeUri);
        return expect(cmdSpy.called).toBe(true);
    });
});
//# sourceMappingURL=FioriElmEditor.spec.js.map