"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const sinon_1 = require("sinon");
const ProjectClient_1 = require("../../../../libs/ProjectClient");
const ExternalSvcImporter_1 = require("../../../../libs/EntityCreater/ExternalSvcImporter");
const mockVSCode_1 = require("../../../mocks/mockVSCode");
const fake_1 = require("../../../mocks/fake");
describe('ExternalSvcImporter', () => {
    let inst;
    const sandbox = (0, sinon_1.createSandbox)();
    it('can be instantiated', () => {
        const inst = new ExternalSvcImporter_1.ExternalSvcImporter();
        expect(inst).toBeInstanceOf(ExternalSvcImporter_1.ExternalSvcImporter);
    });
    beforeEach(() => {
        inst = new ExternalSvcImporter_1.ExternalSvcImporter();
    });
    afterEach(() => sandbox.restore());
    it('conforms EntityCreator Interface', () => expect(typeof inst.exec).toEqual('function'));
    it('reject execution if no service center ext', async () => {
        sandbox.stub(vscode_1.extensions, 'getExtension').returns(undefined);
        const getProjInfoSpy = sandbox.spy(ProjectClient_1.ProjectClient, 'getProjInfo');
        try {
            await Promise.resolve(inst.exec());
        }
        catch (e) { }
        return expect(getProjInfoSpy.called).toBe(false);
    });
    it('exit if no project', async () => {
        sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo').returns(Promise.resolve({ hasWorkspace: false }));
        const execCmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
        await inst.exec();
        return expect(execCmdSpy.called).toBe(false);
    });
    it('can execute if extension is active', async () => {
        sandbox.stub(vscode_1.extensions, 'getExtension').returns({ ...mockVSCode_1.Extension, isActive: true });
        sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo').returns(Promise.resolve({ hasWorkspace: true, projInfo: fake_1.fakeProjectData }));
        const execCmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
        await inst.exec();
        return expect(execCmdSpy.called).toBe(true);
    });
    it('can activate the extension if extension is not active', async () => {
        mockVSCode_1.Extension.isActive = false;
        mockVSCode_1.Extension.activate = jest.fn(() => Promise.resolve());
        sandbox.stub(vscode_1.extensions, 'getExtension').returns(mockVSCode_1.Extension);
        sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo').returns(Promise.resolve({ hasWorkspace: true, projInfo: fake_1.fakeProjectData }));
        const activateSpy = sandbox.spy(mockVSCode_1.Extension, 'activate');
        await inst.exec();
        return expect(activateSpy.called).toBe(true);
    });
    it('can handle the path with ending slash', async () => {
        sandbox.stub(vscode_1.extensions, 'getExtension').returns({ ...mockVSCode_1.Extension, isActive: true });
        sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo').returns(Promise.resolve({ hasWorkspace: true, projInfo: { ...fake_1.fakeProjectData, path: 'foo/' } }));
        const execCmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
        await inst.exec();
        return expect(execCmdSpy.called).toBe(true);
    });
    it('can handle error from project-api', async () => {
        sandbox.stub(vscode_1.extensions, 'getExtension').returns({ ...mockVSCode_1.Extension, isActive: true });
        sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo').returns(Promise.reject());
        try {
            return Promise.resolve(inst.exec());
        }
        catch (err) {
            return expect(err).toBeTruthy();
        }
    });
});
//# sourceMappingURL=ExternalSvcImporter.spec.js.map