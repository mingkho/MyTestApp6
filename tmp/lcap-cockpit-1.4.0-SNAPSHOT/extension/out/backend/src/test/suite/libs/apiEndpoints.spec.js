"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const apiEndpoints_1 = require("../../../libs/apiEndpoints");
const CockpitApiImpl = require("../../../libs/CockpitApi/CockpitApiImpl");
const deployInit = require("../../../libs/Deploy/init");
const EntityCreater = require("../../../libs/EntityCreater");
const EntityEditor = require("../../../libs/EntityEditor");
const LifeCycleClient = require("../../../libs/ShareClient/LifeCycleClient");
const ProjectClient_1 = require("../../../libs/ProjectClient");
const runInit = require("../../../libs/TestRun/init");
const state = require("../../../tasks/states");
const vscode_1 = require("vscode");
const Workspace = require("../../../libs/Workspace");
const fake_1 = require("../../../test/mocks/fake");
const RpcApi_1 = require("../../../../../common/src/RpcApi");
const getEmptyData = require("../../../../../common/src/getEmptyData");
const CrudDispatcher = require("../../../libs/CommonCrudLibs/CrudDispatcher");
describe('apiEndpoints', () => {
    let cmdSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        cmdSpy = sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.resolve(0));
    });
    afterEach(() => sandbox.restore());
    it('can dispatch', () => {
        sandbox.stub(Workspace, 'noWorkspace').returns(false);
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        sandbox.stub(ProjectClient_1.ProjectClient, 'hasProj').value(Promise.resolve(true));
        const dispatchCrudOpsStub = sandbox.stub(CrudDispatcher, 'dispatchCrudOps').returns(Promise.resolve());
        const deployStub = sandbox.stub(deployInit, 'deployProj').returns(Promise.resolve());
        const runStub = sandbox.stub(runInit, 'runProj').returns(Promise.resolve());
        const getProjInfoSpy = sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo').returns(Promise.resolve());
        const entCreatorStub = sandbox.stub(EntityCreater, 'getEntityCreator').returns({ exec: jest.fn() });
        const entEditorStub = sandbox.stub(EntityEditor, 'getEntityEditor').returns({ exec: jest.fn() });
        const watcherStub = sandbox.stub(ProjectClient_1.ProjectClient, 'watcher').value(Promise.resolve({}));
        const getEmptyDataStub = sandbox.stub(getEmptyData, 'getEmptyData').returns(Promise.resolve());
        const pushStub = sandbox.stub(LifeCycleClient, 'push').returns(Promise.resolve({}));
        const pullStub = sandbox.stub(LifeCycleClient, 'pull').returns(Promise.resolve({}));
        const stateStub = sandbox.stub(state, 'fetchStateCacheFor').returns(Promise.resolve({}));
        const termStub = sandbox.stub(state, 'terminate').returns(Promise.resolve({}));
        sandbox.stub(CockpitApiImpl, 'fetchEntriesDebounced').returns(Promise.resolve({}));
        (0, apiEndpoints_1.dispatchAllEndpoints)({ dispatch: jest.fn() });
        return Promise.all(apiEndpoints_1.apiEndpoints.map(api => api.func({ path: '' })))
            .then(() => {
            expect(deployStub.called).toBe(true);
            expect(runStub.called).toBe(true);
            expect(getProjInfoSpy.called).toBe(true);
            expect(entCreatorStub.called).toBe(true);
            expect(entEditorStub.called).toBe(true);
            expect(pushStub.called).toBe(true);
            expect(pullStub.called).toBe(true);
            expect(stateStub.called).toBe(true);
            expect(termStub.called).toBe(true);
            expect(dispatchCrudOpsStub.called).toBe(true);
        })
            .then(() => {
            watcherStub.reset();
            watcherStub.value(Promise.resolve());
            return apiEndpoints_1.apiEndpoints.find(api => api.name === RpcApi_1.ExtEndPoint.getAllItems).func();
        })
            .then(() => expect(getEmptyDataStub.called).toBe(true))
            .catch(() => undefined);
    });
});
//# sourceMappingURL=apiEndpoints.spec.js.map