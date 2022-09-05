"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const sinon_1 = require("sinon");
const SecurityRoleCreator_1 = require("../../../../libs/EntityCreater/SecurityRoleCreator");
describe('SecurityRoleCreator', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let inst;
    let executeCommandSpy;
    beforeEach(() => {
        inst = new SecurityRoleCreator_1.SecurityRoleCreator();
        executeCommandSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
    });
    afterEach(() => sandbox.restore());
    it('can be instantiated', () => {
        const inst = new SecurityRoleCreator_1.SecurityRoleCreator();
        expect(inst).toBeInstanceOf(SecurityRoleCreator_1.SecurityRoleCreator);
    });
    it('conforms EntityCreator Interface', () => expect(typeof inst.exec).toEqual('function'));
    it('can be executed', () => {
        return inst.exec().then(() => expect(executeCommandSpy.called).toBe(true));
    });
});
//# sourceMappingURL=SecurityRoleCreator.spec.js.map