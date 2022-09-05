"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const sinon_1 = require("sinon");
const ProjectClient_1 = require("../../../../libs/ProjectClient");
const notifyUtil = require("../../../../libs/logger/notify");
const UICreator_1 = require("../../../../libs/EntityCreater/UICreator");
const UICreatorAll = require("../../../../libs/EntityCreater/UICreator");
const project_1 = require("project");
const Workspace = require("../../../../libs/Workspace");
const fake_1 = require("../../../../test/mocks/fake");
const CockpitApiImpl_1 = require("../../../../libs/CockpitApi/CockpitApiImpl");
describe('UI Creator', () => {
    let inst;
    let svcListStub;
    let svcEdmxStub;
    let projApiStub;
    let internalSvcStub;
    const sandbox = (0, sinon_1.createSandbox)();
    let executeCommandSpy;
    const fakeSvcInfo = { name: '', sourcePath: '', path: '', entryPath: '', destination: '', edmxPath: '', };
    it('can be instantiated', () => {
        const inst = new UICreator_1.UICreator();
        expect(inst).toBeInstanceOf(UICreator_1.UICreator);
    });
    beforeEach(() => {
        inst = new UICreator_1.UICreator();
        executeCommandSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
        internalSvcStub = sandbox.stub(UICreatorAll, 'isInternalService');
        sandbox.stub(CockpitApiImpl_1.entries, 'current').value([{ path: '' }]);
        svcListStub = sandbox.stub(project_1.ServiceInfo, 'list');
        svcEdmxStub = sandbox.stub(project_1.ServiceInfo, 'getEdmx');
        projApiStub = sandbox.stub(ProjectClient_1.ProjectClient, 'projApi');
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        svcListStub.returns(Promise.resolve([fakeSvcInfo]));
        projApiStub.value(Promise.resolve({}));
        internalSvcStub.returns(true);
    });
    afterEach(() => sandbox.restore());
    it('conforms EntityCreator Interface', () => expect(typeof inst.exec).toEqual('function'));
    it('can be executed', () => {
        return inst.exec().catch(err => expect(err).toBeTruthy);
    });
    it('exits if no project api', () => {
        projApiStub.value(Promise.resolve(undefined));
        const notifySpy = sandbox.spy(notifyUtil, 'notify');
        return inst.exec().finally(() => expect(notifySpy.called).toBe(true));
    });
    it('exits if no service info', () => {
        svcListStub.returns(Promise.resolve(undefined));
        return inst.exec().catch((err) => expect(err).toBeTruthy);
    });
    it('exits if error response of service info', () => {
        svcListStub.returns(Promise.resolve(undefined));
        return inst.exec().catch(err => expect(err).toBeTruthy);
    });
    it('can fetch edmx if there\'s service info', () => {
        return inst.exec().finally(() => expect(svcEdmxStub.called).toBe(true));
    });
    it('can parse service info', () => {
        svcEdmxStub.returns(Promise.resolve(''));
        return inst.exec().catch(() => expect(executeCommandSpy.called).toBe(true));
    });
    it('can resolve path issue with ending slash', () => {
        svcEdmxStub.returns(Promise.resolve('/'));
        return inst.exec().catch(() => expect(executeCommandSpy.called).toBe(true));
    });
    it('can handle error from getEdmx', () => {
        svcEdmxStub.returns(Promise.reject(''));
        return inst.exec().finally(() => expect(executeCommandSpy.called).toBe(false));
    });
});
//# sourceMappingURL=UICreator.spec.js.map