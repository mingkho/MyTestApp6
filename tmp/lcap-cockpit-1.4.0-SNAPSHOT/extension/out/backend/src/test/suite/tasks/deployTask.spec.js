"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deployTask_1 = require("../../../tasks/deployTask");
const vscode_1 = require("vscode");
const sinon_1 = require("sinon");
const Workspace = require("../../../libs/Workspace");
const fake_1 = require("../../mocks/fake");
describe('deployTask', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can get task instance', () => {
        sandbox.stub(Workspace, 'noWorkspace').returns(false);
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        const inst = (0, deployTask_1.getDeployTask)();
        expect(inst).toBeInstanceOf(vscode_1.Task);
    });
});
//# sourceMappingURL=deployTask.spec.js.map