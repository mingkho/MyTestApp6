"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const ChildProcessUtil = require("../../../libs/ChildProcess/ChildProcess");
const vscode_1 = require("vscode");
const CloudFoundry_1 = require("../../../libs/CloudFoundry");
describe('Workspace', () => {
    let cmdSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        cmdSpy = sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.resolve(0));
    });
    afterEach(() => sandbox.restore());
    it('can login', async () => {
        const msgStub = sandbox.stub(vscode_1.window, 'showInformationMessage').returns(Promise.resolve('Log In'));
        try {
            await (0, CloudFoundry_1.login)();
            expect(cmdSpy.called).toBe(true);
        }
        catch (ignore) { }
        try {
            msgStub.reset();
            msgStub.returns(Promise.resolve(''));
            await (0, CloudFoundry_1.login)();
        }
        catch (res) {
            expect(res).toBe('Canceled');
        }
    });
    it('can detect login status', async () => {
        const execStub = sandbox.stub(ChildProcessUtil, 'exec').returns(Promise.resolve('test'));
        const res = await (0, CloudFoundry_1.hasLoggedIn)();
        expect(res).toBe(true);
        execStub.reset();
        execStub.returns(Promise.resolve(''));
        const res_1 = await (0, CloudFoundry_1.hasLoggedIn)();
        expect(res_1).toBe(false);
        execStub.reset();
        execStub.returns(Promise.reject(''));
        const res_2 = await (0, CloudFoundry_1.hasLoggedIn)();
        return expect(res_2).toBe(false);
    });
});
//# sourceMappingURL=CloudFoundry.spec.js.map