"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const Task_1 = require("../../../tasks/Task");
const vscode_1 = require("vscode");
const Task_2 = require("../../../../../common/src/Task");
const Workspace = require("../../../libs/Workspace");
const fake_1 = require("../../../test/mocks/fake");
describe('Task', () => {
    let cmdSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        cmdSpy = sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.resolve(0));
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
    });
    afterEach(() => sandbox.restore());
    describe('taskFolder', () => {
        it('can join the path', () => expect((0, Task_1.taskFolder)('foobar').includes('foobar')).toBe(true));
    });
    describe('shellCmdFor', () => {
        it('get shell cmd', () => expect((0, Task_1.shellCmdFor)(Task_2.HomepageTasks.Deploy, 'arg').includes(`${Task_2.HomepageTasks.Deploy}`)).toBe(true));
    });
});
//# sourceMappingURL=Task.spec.js.map