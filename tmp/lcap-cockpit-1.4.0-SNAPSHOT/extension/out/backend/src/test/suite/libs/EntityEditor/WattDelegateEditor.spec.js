"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const WattDelegateEditor_1 = require("../../../../libs/EntityEditor/WattDelegateEditor");
const vscode_1 = require("vscode");
const fake_1 = require("../../../mocks/fake");
describe('WattDelegateEditor', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let inst;
    beforeEach(() => {
        inst = new WattDelegateEditor_1.default();
    });
    it('can be executed', async () => {
        const openSpy = sandbox.spy(vscode_1.workspace, 'openTextDocument');
        await inst.exec(fake_1.fakeUri);
        return expect(openSpy.called).toBe(true);
    });
});
//# sourceMappingURL=WattDelegateEditor.spec.js.map