"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const AuthorizationEditor_1 = require("../../../../libs/EntityEditor/AuthorizationEditor");
const vscode_1 = require("vscode");
describe('AuthorizationEditor', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can be executed', async () => {
        const cmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
        await new AuthorizationEditor_1.AuthorizationEditor().exec({});
        return expect(cmdSpy.called).toBe(true);
    });
});
//# sourceMappingURL=AuthorizationEditor.spec.js.map