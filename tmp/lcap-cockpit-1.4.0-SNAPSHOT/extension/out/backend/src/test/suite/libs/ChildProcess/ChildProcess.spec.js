"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const sinon_1 = require("sinon");
const ChildProcess = require("../../../../libs/ChildProcess/ChildProcess");
describe('ChildProcess', () => {
    const fakeChildProcess = {
        stdout: {
            on: (arg, fn) => fn('data')
        },
        stderr: {
            on: (arg, fn) => fn('error')
        },
        on: (arg, fn) => fn(0)
    };
    let execSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        execSpy = sandbox.stub(child_process, 'exec').returns({ ...fakeChildProcess });
    });
    afterEach(() => sandbox.restore());
    it('can exec', () => {
        ChildProcess.exec('cmd').then(res => expect(res).toBe('data'));
    });
    it('can handle abnormal condition', () => {
        execSpy.reset();
        execSpy.returns({ ...fakeChildProcess, stderr: undefined, stdout: undefined });
        ChildProcess.exec('cmd').then(res => expect(res).toBe(''));
    });
    it('can handle exit code', () => {
        execSpy.reset();
        execSpy.returns({ ...fakeChildProcess, on: (arg, fn) => fn(1) });
        ChildProcess.exec('cmd').catch(err => expect(err).toBeTruthy());
    });
});
//# sourceMappingURL=ChildProcess.spec.js.map