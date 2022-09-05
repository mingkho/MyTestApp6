"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const Workspace = require("../../../../libs/Workspace");
const fake_1 = require("../../../../test/mocks/fake");
const LcapDeploy_1 = require("../../../../libs/Deploy/LcapDeploy");
const deployTask = require("../../../../tasks/deployTask");
const vscode_1 = require("vscode");
describe('LcapDeploy', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    sandbox.stub(Workspace, 'noWorkspace').returns(false);
    sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
    const inst = new LcapDeploy_1.LcapDeploy();
    it('can deploy', async () => {
        const getTaskSpy = sandbox.spy(deployTask, 'getDeployTask');
        await inst.deploy();
        expect(getTaskSpy.called).toBe(true);
    });
    it('can handle error', () => {
        sandbox.stub(vscode_1.tasks, 'executeTask').returns(Promise.reject('err'));
        return inst.deploy().catch(err => expect(err).toBeTruthy);
    });
});
;
//# sourceMappingURL=LcapDeploy.spec.js.map