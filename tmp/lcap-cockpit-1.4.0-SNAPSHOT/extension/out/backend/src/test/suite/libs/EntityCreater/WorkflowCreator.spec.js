"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const sinon_1 = require("sinon");
const ProjectClient_1 = require("../../../../libs/ProjectClient");
const WorkflowCreator_1 = require("../../../../libs/EntityCreater/WorkflowCreator");
const fake_1 = require("../../../mocks/fake");
const project_1 = require("project");
const project_2 = require("project");
const Workspace = require("../../../../libs/Workspace");
describe('Workflow Creator', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    const OPEN_WITH_PARAMS = 'workflow.createWorkflow';
    let inst;
    let executeCommandSpy;
    beforeEach(() => {
        inst = new WorkflowCreator_1.WorkflowCreator();
        executeCommandSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
    });
    afterEach(() => sandbox.restore());
    it('can be instantiated', () => {
        const inst = new WorkflowCreator_1.WorkflowCreator();
        expect(inst).toBeInstanceOf(WorkflowCreator_1.WorkflowCreator);
    });
    it('conforms EntityCreator Interface', () => expect(typeof inst.exec).toEqual('function'));
    it('can be executed', () => {
        const apiWithMod = new project_1.ProjectImpl('.');
        const WF_PATH = 'workflow';
        const PROJ_PATH = '/tmp';
        apiWithMod.read = () => Promise.resolve({
            ...fake_1.fakeProjectData,
            modules: [
                { name: 'foobar', type: project_2.ModuleType.MDK, path: '', items: [], tags: [] },
                { name: 'workflow', type: project_2.ModuleType.Workflow, path: WF_PATH, items: [], tags: [] },
            ]
        });
        sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve(apiWithMod));
        fake_1.fakeWorkspaceFolder.uri = { ...fake_1.fakeUri, fsPath: PROJ_PATH };
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        return inst.exec().then(() => expect(executeCommandSpy.called).toBe(true));
    });
    it('can terminate properly if no project information', () => {
        const emptyApi = new project_1.ProjectImpl('.');
        emptyApi.read = () => Promise.resolve({ ...fake_1.fakeProjectData, modules: [] });
        sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve(emptyApi));
        return inst.exec().then(() => expect(executeCommandSpy.called).toBe(false));
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
//# sourceMappingURL=WorkflowCreator.spec.js.map