"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const CDSEntEditor_1 = require("../../../../libs/EntityEditor/CDSEntEditor");
const vscode_1 = require("vscode");
const openWith = require("../../../../libs/EntityEditor/openWithCdsGM");
const fake_1 = require("../../../../test/mocks/fake");
describe('CDSEntEditor', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let inst;
    let cmdSpy;
    beforeEach(() => {
        inst = new CDSEntEditor_1.default();
        cmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
    });
    afterEach(() => sandbox.restore());
    it('can be executed', async () => {
        const openSpy = sandbox.spy(openWith, 'openWithCdsGM');
        await inst.exec(fake_1.fakeUri, {});
        return expect(openSpy.called).toBe(true);
    });
});
//# sourceMappingURL=CDSEntEditor.spec.js.map