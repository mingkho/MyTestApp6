"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testRunTask = require("../../../../tasks/testRunTask");
const LcapTestRun_1 = require("../../../../libs/TestRun/LcapTestRun");
const sinon_1 = require("sinon");
const Workspace = require("../../../../libs/Workspace");
const fake_1 = require("../../../../test/mocks/fake");
describe('LcapTestRun', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can run', async () => {
        const inst = new LcapTestRun_1.LcapTestRun();
        const getTaskSpy = sandbox.spy(testRunTask, 'getTestRunTask');
        sandbox.stub(Workspace, 'noWorkspace').returns(false);
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        await inst.run();
        expect(getTaskSpy.called).toBe(true);
    });
});
//# sourceMappingURL=LcapTestRun.spec.js.map