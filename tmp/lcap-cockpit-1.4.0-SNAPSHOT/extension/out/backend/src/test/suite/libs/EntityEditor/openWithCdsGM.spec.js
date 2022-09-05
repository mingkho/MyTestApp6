"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const fake_1 = require("../../../../test/mocks/fake");
const vscode_1 = require("vscode");
const openWithCdsGM_1 = require("../../../../libs/EntityEditor/openWithCdsGM");
describe('openWithCdsGM', () => {
    it('can exec command', async () => {
        const sandbox = (0, sinon_1.createSandbox)();
        const cmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
        await (0, openWithCdsGM_1.openWithCdsGM)([fake_1.fakeUri, undefined]);
        expect(cmdSpy.called).toBe(true);
    });
});
//# sourceMappingURL=openWithCdsGM.spec.js.map