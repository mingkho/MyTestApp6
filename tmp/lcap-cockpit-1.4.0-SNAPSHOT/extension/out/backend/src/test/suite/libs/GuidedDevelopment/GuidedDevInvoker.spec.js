"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const GuidedDevInvoker_1 = require("../../../../libs/GuidedDevelopment/GuidedDevInvoker");
const vscode_1 = require("vscode");
describe('GuidedDevInvoker', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can invokeGuidedDev', () => {
        const cmdSpy = sandbox.stub(vscode_1.commands, 'executeCommand');
        return (0, GuidedDevInvoker_1.invokeGuidedDev)().then(() => expect(cmdSpy.called).toBe(true));
    });
});
//# sourceMappingURL=GuidedDevInvoker.spec.js.map