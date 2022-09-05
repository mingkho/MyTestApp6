"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const LifeCycleClient = require("../../../libs/ShareClient/LifeCycleClient");
const vscode_1 = require("vscode");
const notifyUtil = require("../../../libs/logger/notify");
const ProjectClient_1 = require("../../../libs/ProjectClient");
const LifeCycleStatus_1 = require("../../../../../common/src/LifeCycleStatus");
const Workspace = require("../../../libs/Workspace");
const fake_1 = require("../../../test/mocks/fake");
const Commands = require("../../../libs/Commands");
describe('LifeCycleClient', () => {
    let cmdSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        cmdSpy = sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.resolve(0));
        sandbox.stub(LifeCycleClient, 'hasLifecycleExt').value(true);
    });
    afterEach(() => sandbox.restore());
    describe('pull', () => {
        it('can pull', async () => {
            await LifeCycleClient.pull();
            return expect(cmdSpy.called).toBe(true);
        });
        it('can handle conflict', async () => {
            cmdSpy.reset();
            cmdSpy.returns(Promise.resolve(1));
            const msgStub = sandbox.stub(vscode_1.window, 'showErrorMessage').returns(Promise.resolve('Don\'t update'));
            await LifeCycleClient.pull();
            expect(cmdSpy.called).toBe(true);
            msgStub.reset();
            msgStub.returns(Promise.resolve('Discard & update'));
            await LifeCycleClient.pull();
            return expect(cmdSpy.called).toBe(true);
        });
        it('can handle other errors', async () => {
            cmdSpy.reset();
            cmdSpy.returns(Promise.resolve(2));
            await LifeCycleClient.pull();
            return expect(cmdSpy.called).toBe(true);
        });
    });
    describe('push', () => {
        it('can commit msg', async () => {
            const inputStub = sandbox.stub(vscode_1.window, 'showInputBox').returns(Promise.resolve(''));
            cmdSpy.reset();
            cmdSpy.returns(Promise.resolve(0));
            await LifeCycleClient.push();
            expect(cmdSpy.called).toBe(true);
            inputStub.reset();
            inputStub.returns(Promise.resolve(undefined));
            await LifeCycleClient.push();
            return expect(cmdSpy.called).toBe(true);
        });
        it('can handle error', async () => {
            cmdSpy.reset();
            sandbox.stub(vscode_1.window, 'showInputBox').returns(Promise.resolve(''));
            cmdSpy.returns(Promise.resolve(1));
            const notifySpy = sandbox.spy(notifyUtil, 'notify');
            await LifeCycleClient.push();
            expect(notifySpy.called).toBe(true);
            cmdSpy.reset();
            cmdSpy.returns(Promise.resolve(2));
            await LifeCycleClient.push();
            return expect(notifySpy.called).toBe(true);
        });
    });
    describe('disacardAndPull', () => {
        it('can handle success', async () => {
            const notifySpy = sandbox.spy(notifyUtil, 'notify');
            await LifeCycleClient.discardAndPull();
            return expect(notifySpy.called).toBe(false);
        });
    });
    describe('status', () => {
        it('can detect proj status', async () => {
            const hasProjStub = sandbox.stub(ProjectClient_1.ProjectClient, 'hasProj').value(Promise.resolve(false));
            const noWsStub = sandbox.stub(Workspace, 'noWorkspace').returns(true);
            const localStub = sandbox.stub(Commands, 'hasLocalRepo').returns(Promise.resolve(false));
            const remoteStub = sandbox.stub(Commands, 'hasRemoteRepo').returns(Promise.resolve(false));
            return LifeCycleClient.status()
                .then(res => {
                expect(res).toBe(LifeCycleStatus_1.LifecycleStatus.NoProject);
                hasProjStub.reset();
                hasProjStub.value(Promise.resolve(true));
                return LifeCycleClient.status();
            }).then(res => {
                expect(res).toBe(LifeCycleStatus_1.LifecycleStatus.NoProject);
                noWsStub.reset();
                noWsStub.returns(false);
                sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
                return LifeCycleClient.status();
            })
                .then(res => {
                expect(res).toBe(LifeCycleStatus_1.LifecycleStatus.NoRepo);
                localStub.reset();
                localStub.returns(Promise.resolve(true));
                return LifeCycleClient.status();
            })
                .then(res => {
                expect(res).toBe(LifeCycleStatus_1.LifecycleStatus.NoRemote);
                remoteStub.reset();
                remoteStub.returns(Promise.resolve(true));
                cmdSpy.reset();
                cmdSpy.returns(Promise.resolve({ behind: 1 }));
                return LifeCycleClient.status();
            })
                .then(res => {
                expect(res).toBe(LifeCycleStatus_1.LifecycleStatus.BehindOfRemote);
                cmdSpy.reset();
                cmdSpy.returns(Promise.resolve());
                return LifeCycleClient.status();
            })
                .then(undefined, err => {
                expect(err).toBeTruthy();
                cmdSpy.reset();
                cmdSpy.returns(Promise.resolve({ behind: 0 }));
                return LifeCycleClient.status();
            })
                .then(res => expect(res).toBe(LifeCycleStatus_1.LifecycleStatus.UpToDate));
        });
    });
    describe('refreshExtState', () => {
        it('can refreshState', async () => {
            expect(LifeCycleClient.refreshExtState()).toBe(false);
            sandbox.stub(vscode_1.extensions, 'all').value([{ id: '' }]);
            LifeCycleClient.refreshExtState();
            return LifeCycleClient.pull();
        });
    });
});
//# sourceMappingURL=LifeCycleClient.spec.js.map