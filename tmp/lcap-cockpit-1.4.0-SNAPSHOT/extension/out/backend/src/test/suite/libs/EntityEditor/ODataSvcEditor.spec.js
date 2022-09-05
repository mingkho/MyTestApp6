"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const ODataSvcEditor_1 = require("../../../../libs/EntityEditor/ODataSvcEditor");
const vscode_1 = require("vscode");
const openWith = require("../../../../libs/EntityEditor/openWithCdsGM");
const fake_1 = require("../../../mocks/fake");
describe('ODataSvcEditor', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let inst;
    let cmdSpy;
    beforeEach(() => {
        inst = new ODataSvcEditor_1.default();
        cmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
    });
    afterEach(() => sandbox.restore());
    it('can be executed', async () => {
        const openSpy = sandbox.spy(openWith, 'openWithCdsGM');
        await inst.exec(fake_1.fakeUri, { secLabelProp: {} });
        expect(openSpy.called).toBe(true);
        await inst.exec(fake_1.fakeUri, {});
    });
});
//# sourceMappingURL=ODataSvcEditor.spec.js.map