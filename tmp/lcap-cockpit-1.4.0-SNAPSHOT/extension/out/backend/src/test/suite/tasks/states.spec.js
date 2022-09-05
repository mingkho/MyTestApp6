"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const Task_1 = require("../../../tasks/Task");
const vscode_1 = require("vscode");
const Task_2 = require("../../../../../common/src/Task");
const Workspace = require("../../../libs/Workspace");
const fake_1 = require("../../../test/mocks/fake");
const states = require("../../../tasks/states");
const Commands = require("../../../libs/Commands");
const notifyUtil = require("../../../libs/logger/notify");
describe('states', () => {
    let cmdSpy;
    let noWsSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        cmdSpy = sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.resolve(0));
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        noWsSpy = sandbox.stub(Workspace, 'noWorkspace').returns(false);
    });
    afterEach(() => sandbox.restore());
    it('can subscribe all events', () => {
        const fakeSubscribe = (fn) => fn({ execution: { task: { definition: {} } } });
        const onStartSub = sandbox.stub(vscode_1.tasks, 'onDidStartTask').callsFake(fakeSubscribe);
        const onEndSub = sandbox.stub(vscode_1.tasks, 'onDidEndTask').callsFake(fakeSubscribe);
        let res = states.subAllTaskEvts({});
        const takeSubscribeWithType = (fn) => fn({ execution: { task: { definition: { type: Task_1.LCAP_PROJ_TASK_TYPE } } } });
        onStartSub.reset();
        onStartSub.callsFake(takeSubscribeWithType);
        onEndSub.reset();
        onEndSub.callsFake(takeSubscribeWithType);
        res = states.subAllTaskEvts({});
        expect(res.length).toBe(3);
    });
    it('can refresh all the states', async () => {
        sandbox.stub(states, 'execsByDefName').returns(([{}]));
        await states.refreshAllStates();
        expect(states.fetchStateCacheFor(Task_2.HomepageTasks.Deploy)).toBe(Task_2.TaskStates.Running);
    });
    it('can terminate ', async () => {
        const execSpy = sandbox.stub(states, 'execsByDefName').returns(([{ terminate: jest.fn() }]));
        await states.terminate(Task_2.HomepageTasks.Deploy);
        execSpy.returns(([{ terminate: () => { throw 'tmp'; } }]));
        await states.terminate(Task_2.HomepageTasks.Deploy);
    });
    it('can handle non-exist task info in theia', async () => {
        sandbox.stub(states, 'execsByDefName').returns([]);
        await states.terminate(Task_2.HomepageTasks.Deploy);
        return new Promise(res => setTimeout(() => res(1), 0));
    });
    it('can notify unknown task info', () => {
        const notifySpy = sandbox.spy(notifyUtil, 'notify');
        states.fetchStateCacheFor('unknown');
        expect(notifySpy.called).toBe(true);
    });
    it('can auto detect state while set state for', async () => {
        const getStateForSpy = sandbox.spy(states.states, 'set');
        await states.setStateFor(Task_2.HomepageTasks.Deploy);
        expect(getStateForSpy.called).toBe(true);
        sandbox.stub(Commands, 'pidsFrom').returns(Promise.resolve(['1']));
        await states.setStateFor(Task_2.HomepageTasks.Deploy);
    });
    it('can make response if no workspace', () => {
        noWsSpy.reset();
        noWsSpy.returns(true);
        return states.setStateFor(Task_2.HomepageTasks.Deploy);
    });
    it('can get exec by type and name', () => {
        sandbox.stub(vscode_1.tasks, 'taskExecutions').value([
            { task: { definition: { name: Task_2.HomepageTasks.Deploy, type: Task_1.LCAP_PROJ_TASK_TYPE } } }
        ]);
        expect(states.execsByDefName(Task_2.HomepageTasks.Deploy).length).toBe(1);
    });
});
//# sourceMappingURL=states.spec.js.map