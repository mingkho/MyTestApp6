"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Workspace = require("../../../libs/Workspace");
const sinon_1 = require("sinon");
const tasks_1 = require("../../../tasks");
const fake_1 = require("../../../test/mocks/fake");
const vscode_1 = require("vscode");
const Task_1 = require("../../../../../common/src/Task");
const testRun = require("../../../tasks/testRunTask");
const deploy = require("../../../tasks/deployTask");
const Task_2 = require("../../../tasks/Task");
describe('tasksIndex', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    sandbox.stub(Workspace, 'noWorkspace').returns(false);
    sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
    const provider = (0, tasks_1.provideHomepageTasks)();
    it('can provideTasks', () => {
        const res = provider.provideTasks(undefined);
        expect(res.length).toBe(2);
        expect(res.every((t) => t instanceof vscode_1.Task)).toBe(true);
    });
    it('can resolveTasks', () => {
        const res = provider.resolveTask({ definition: { name: '' } }, undefined);
        expect(res).toBe(undefined);
        const testRunSpy = sandbox.spy(testRun, 'getTestRunTask');
        provider.resolveTask({ definition: { type: Task_2.LCAP_PROJ_TASK_TYPE, name: Task_1.HomepageTasks.TestRun } }, undefined);
        expect(testRunSpy.called).toBe(true);
        const deploySpy = sandbox.spy(deploy, 'getDeployTask');
        provider.resolveTask({ definition: { type: Task_2.LCAP_PROJ_TASK_TYPE, name: Task_1.HomepageTasks.Deploy } }, undefined);
        expect(deploySpy.called).toBe(true);
    });
});
//# sourceMappingURL=tasksIndex.spec.js.map