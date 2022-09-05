"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const sinon_1 = require("sinon");
const CDSEntCreator_1 = require("../../../../libs/EntityCreater/CDSEntCreator");
const CDSGraphicalModelerApi_1 = require("../../../../libs/CommonCrudLibs/CDSGraphicalModelerApi");
const ProjectClient_1 = require("../../../../libs/ProjectClient");
const fake_1 = require("../../../mocks/fake");
const CAPUtil = require("../../../../libs/EntityCreater/CAPUtil");
const notifyUtil = require("../../../../libs/logger/notify");
describe('CDS Entity Creator', () => {
    let inst;
    const sandbox = (0, sinon_1.createSandbox)();
    let executeCommandSpy;
    it('can be instantiated', () => {
        const inst = new CDSEntCreator_1.CDSEntCreator();
        expect(inst).toBeInstanceOf(CDSEntCreator_1.CDSEntCreator);
    });
    beforeEach(() => {
        inst = new CDSEntCreator_1.CDSEntCreator();
        executeCommandSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
    });
    afterEach(() => sandbox.restore());
    it('conforms EntityCreator Interface', () => expect(typeof inst.exec).toEqual('function'));
    it('can be executed', () => {
        sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo')
            .returns(Promise.resolve({ hasWorkspace: true, projInfo: fake_1.fakeProjectData }));
        sandbox.stub(CAPUtil, 'prepareDbCds').returns(Promise.resolve(''));
        return inst.exec().then(() => expect(executeCommandSpy.calledWith(CDSGraphicalModelerApi_1.CDS_CMDS.OPEN_WITH_PARAMS)).toBe(true));
    });
    it('can handle error', () => {
        sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo').returns(Promise.reject(''));
        const notifySpy = sandbox.spy(notifyUtil, 'notify');
        return inst.exec().then(() => expect(notifySpy.calledWith('err', notifyUtil.NotifyDest.ErrLog)).toBe(false));
    });
    it('should not be executed if no workspace', () => {
        sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo').returns(Promise.resolve({ hasWorkspace: false }));
        return inst.exec().then(() => expect(executeCommandSpy.called).toBe(false));
    });
    it('should not be executed if no project', () => {
        sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo')
            .returns(Promise.resolve({ hasWorkspace: true, projInfo: undefined }));
        return inst.exec().then(() => expect(executeCommandSpy.called).toBe(false));
    });
});
//# sourceMappingURL=CDSEntCreator.spec.js.map