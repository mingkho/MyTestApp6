"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const Workspace = require("../../../libs/Workspace");
const ProjectClient_1 = require("../../../libs/ProjectClient");
const project_1 = require("project");
describe('ProjectClient', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => { });
    afterEach(() => sandbox.restore());
    describe('setApis', () => {
        it('can set proj apis', () => {
            ProjectClient_1.ProjectClient.setApis();
            expect(typeof ProjectClient_1.ProjectClient.projApis.then).toBe('function');
            expect(typeof ProjectClient_1.ProjectClient.projApi.then).toBe('function');
            expect(typeof ProjectClient_1.ProjectClient.hasProj.then).toBe('function');
            expect(typeof ProjectClient_1.ProjectClient.watcher.then).toBe('function');
        });
        it('can handle error response from Project-API', () => {
            sandbox.stub(ProjectClient_1.ProjectClient, 'workspaceApi')
                .value({ getProjects: () => Promise.reject() });
            ProjectClient_1.ProjectClient.setApis();
            return ProjectClient_1.ProjectClient.hasProj.then(r => expect(r).toBe(false));
        });
        it('can resolve if empty response', () => {
            sandbox.stub(ProjectClient_1.ProjectClient, 'workspaceApi')
                .value({ getProjects: () => Promise.resolve([{ watchItems: jest.fn(), read: () => Promise.resolve() }]) });
            ProjectClient_1.ProjectClient.setApis();
            return ProjectClient_1.ProjectClient.hasProj.then(r => expect(r).toBe(false));
        });
        it('can tell if no proj', () => {
            sandbox.stub(ProjectClient_1.ProjectClient, 'workspaceApi')
                .value({ getProjects: () => Promise.resolve([{ watchItems: jest.fn(), read: () => Promise.resolve({}) }]) });
            ProjectClient_1.ProjectClient.setApis();
            return ProjectClient_1.ProjectClient.hasProj.then(r => expect(r).toBe(false));
        });
        it('can tell the existence of proj', () => {
            sandbox.stub(ProjectClient_1.ProjectClient, 'workspaceApi')
                .value({ getProjects: () => Promise.resolve([{ watchItems: jest.fn(), read: () => Promise.resolve({ name: 'name' }) }]) });
            ProjectClient_1.ProjectClient.setApis();
            return ProjectClient_1.ProjectClient.hasProj.then(r => expect(r).toBe(true));
        });
    });
    describe('getProjInfo', () => {
        it('can detect workspace', () => {
            sandbox.stub(Workspace, 'noWorkspace').returns(true);
            sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve(undefined));
            return ProjectClient_1.ProjectClient.getProjInfo().then(res => expect(res.hasWorkspace).toBe(false));
        });
        it('can fetch info', () => {
            sandbox.stub(Workspace, 'noWorkspace').returns(false);
            sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve({ getProjectInfo: jest.fn(() => Promise.resolve({})) }));
            return ProjectClient_1.ProjectClient.getProjInfo().then(res => expect(res.hasWorkspace && res.projInfo).toBeTruthy);
        });
    });
    describe('initAutoBuild', () => {
        it('can start', () => {
            const projApi = new project_1.ProjectImpl('.');
            const autoBuildSpy = sandbox.stub(projApi, 'autoBuild').returns(Promise.resolve({ start: jest.fn() }));
            return ProjectClient_1.ProjectClient.initAutoBuild(projApi).then(() => expect(autoBuildSpy.called).toBe(true));
        });
    });
});
//# sourceMappingURL=ProjectClient.spec.js.map