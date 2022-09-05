"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testRunTask = require("../../../tasks/testRunTask");
const vscode_1 = require("vscode");
const sinon_1 = require("sinon");
const Workspace = require("../../../libs/Workspace");
const fake_1 = require("../../../test/mocks/fake");
describe('testRunTask', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can get task instance', () => {
        sandbox.stub(Workspace, 'noWorkspace').returns(false);
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        sandbox.stub(testRunTask, 'testRunTaskEnv').value({});
        const inst = testRunTask.getTestRunTask();
        expect(inst).toBeInstanceOf(vscode_1.Task);
    });
});
//# sourceMappingURL=testRunTask.spec.js.map