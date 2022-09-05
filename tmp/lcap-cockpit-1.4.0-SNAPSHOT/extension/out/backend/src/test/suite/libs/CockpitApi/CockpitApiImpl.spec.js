"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const CockpitApiImpl = require("../../../../libs/CockpitApi/CockpitApiImpl");
const LifeCycleClient = require("../../../../libs/ShareClient/LifeCycleClient");
const vscode_1 = require("vscode");
const ProjectClient_1 = require("../../../../libs/ProjectClient");
const project_1 = require("project");
const SampleDataUtil = require("../../../../libs/EntityCreater/SampleDataUtil");
const WorkspaceUtil = require("../../../../libs/Workspace");
const fake_1 = require("../../../../test/mocks/fake");
const fs = require("fs");
const states_1 = require("../../../../tasks/states");
const LifeCycleClient_1 = require("../../../../libs/ShareClient/LifeCycleClient");
const notifyUtil = require("../../../../libs/logger/notify");
const getEmptyData = require("../../../../../../common/src/getEmptyData");
const Validator = require("../../../../libs/Validator");
const DependencyResolver = require("../../../../libs/DependencyResolver");
describe('CockpitApiImpl', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    const fakeProjApi = {
        getDetailInfo: jest.fn(() => Promise.resolve({})),
        getModulesInfo: jest.fn(() => Promise.resolve([{ type: 'testMod' }])),
        fs: jest.fn(() => ({ readTextFile: jest.fn(() => Promise.resolve('')) })),
        readItems: jest.fn(() => Promise.resolve([
            { type: project_1.ItemType.CDSEntity },
            { type: project_1.ItemType.CSVFile },
            { type: project_1.ItemType.CAPService, info: 'testInfo' },
        ]))
    };
    beforeEach(() => sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.resolve(0)));
    afterEach(() => sandbox.restore());
    describe('groupCount', () => {
        it('can count group', () => {
            const res = CockpitApiImpl.groupCount([{ type: 'a' }, { type: 'b' }, { type: 'a' }]);
            expect(res).toBe(" a: 2   \n b: 1 ");
        });
    });
    describe('fetchEntries', () => {
        it('can fetchEntries', async () => {
            sandbox.stub(ProjectClient_1.ProjectClient, 'watcher').value(Promise.resolve({}));
            sandbox.stub(CockpitApiImpl, 'populateItemsInfo').returns(([]));
            const refMdkStub = sandbox.stub(CockpitApiImpl, 'refreshChangedMdkApps');
            sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve(fakeProjApi));
            await CockpitApiImpl.fetchEntries({});
            expect(refMdkStub.called).toBe(true);
            sandbox.stub(SampleDataUtil, 'countEntries').throws();
            await CockpitApiImpl.fetchEntries({});
            expect(refMdkStub.called).toBe(true);
            refMdkStub.reset();
            refMdkStub.throws();
            await CockpitApiImpl.fetchEntries({});
            await CockpitApiImpl.fetchEntries(undefined);
        });
    });
    describe('refreshChangedMdkApps', () => {
        it('can exit if no entity', () => {
            sandbox.stub(CockpitApiImpl, 'entries').value({ current: [] });
            expect(CockpitApiImpl.refreshChangedMdkApps()).toBeTruthy();
        });
        it('can refresh content', () => {
            sandbox.stub(WorkspaceUtil, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
            sandbox.stub(CockpitApiImpl, 'entries').value({
                current: [
                    { path: '/a', type: project_1.ItemType.MDKApplication },
                    { path: '', type: project_1.ItemType.UI5Application },
                    { path: '/b', type: project_1.ItemType.MDKPage },
                    { path: '/a', type: project_1.ItemType.MDKPage }
                ]
            });
            let tmpCount = 0;
            const statStub = sandbox.stub(fs, 'statSync').returns({ mtime: 0 });
            CockpitApiImpl.refreshChangedMdkApps();
            statStub.reset();
            statStub.callsFake(() => ({ mtime: tmpCount++ }));
            CockpitApiImpl.refreshChangedMdkApps();
            statStub.reset();
            statStub.throws();
            CockpitApiImpl.refreshChangedMdkApps();
            let isFirstExec = true;
            statStub.reset();
            statStub.callsFake(() => {
                if (isFirstExec) {
                    isFirstExec = false;
                    return { mtime: tmpCount++ };
                }
                throw new Error();
            });
            CockpitApiImpl.refreshChangedMdkApps();
        });
    });
    describe('dispatchLifecycleHook', () => {
        sandbox.stub(LifeCycleClient_1.lifecycleHook, 'addListener').callsFake((e, cb) => cb());
        const res = LifeCycleClient.dispatchLifecycleHook({ post: jest.fn() });
        expect(res).toBeInstanceOf(Array);
    });
    describe('dispatchTaskStateHook', () => {
        sandbox.stub(states_1.taskStateHook, 'event').callsFake(arg => arg());
        const res = CockpitApiImpl.dispatchTaskStateHook({ post: jest.fn() });
        expect(res).toBeInstanceOf(Array);
    });
    describe('dispatchFileChanges', () => {
        it('can dispatch', async () => {
            const watcherStub = sandbox.stub(ProjectClient_1.ProjectClient, 'watcher').value(Promise.resolve({ on: jest.fn((ev, fn) => fn()) }));
            sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve(fakeProjApi));
            const refreshStub = sandbox.stub(CockpitApiImpl, 'refreshHomePage');
            await CockpitApiImpl.dispatchFileChanges({ post: jest.fn() });
            expect(refreshStub.called).toBe(true);
            watcherStub.reset();
            watcherStub.value(Promise.resolve());
            await CockpitApiImpl.dispatchFileChanges({ post: jest.fn() });
        });
    });
    describe('dispatchWorkspaceChanges', () => {
        it('can dispatch', () => {
            sandbox.stub(ProjectClient_1.ProjectClient.workspaceApi, 'onWorkspaceChanged').callsFake(jest.fn(fn => fn()));
            sandbox.stub(ProjectClient_1.ProjectClient.workspaceApi, 'startWatch').callsFake(jest.fn());
            const apiStub = sandbox.stub(ProjectClient_1.ProjectClient, 'projApis').value(Promise.resolve([]));
            const dispFileSpy = sandbox.stub(CockpitApiImpl, 'dispatchFileChanges');
            sandbox.stub(ProjectClient_1.ProjectClient, 'setApis');
            CockpitApiImpl.dispatchWorkspaceChanges({ post: jest.fn() });
            apiStub.reset();
            apiStub.value(Promise.resolve([{}]));
            CockpitApiImpl.dispatchWorkspaceChanges({ post: jest.fn() });
            return new Promise(res => setTimeout(() => res(expect(dispFileSpy.called).toBe(true)), 0));
        });
    });
    describe('refreshHomepage', () => {
        it('can handle refresh', async () => {
            sandbox.stub(CockpitApiImpl, 'populateItemsInfo').returns(Promise.resolve([{}]));
            const fetchEntriesSpy = sandbox.stub(CockpitApiImpl, 'fetchEntriesDebounced').returns(Promise.resolve());
            const emtpyDataSpy = sandbox.spy(getEmptyData, 'getEmptyData');
            const notifySpy = sandbox.spy(notifyUtil, 'notify');
            const projInfoSpy = sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo').returns(Promise.resolve({}));
            await CockpitApiImpl.refreshHomePage({ post: jest.fn() }, {});
            await new Promise(res => setTimeout(() => setTimeout(() => res(undefined), 0), 0));
            expect(fetchEntriesSpy.called).toBe(true);
            expect(projInfoSpy.called).toBe(true);
            projInfoSpy.reset();
            projInfoSpy.returns(Promise.reject());
            await CockpitApiImpl.refreshHomePage({ post: jest.fn() }, {});
            await new Promise(res_1 => setTimeout(() => res_1(undefined), 0));
            expect(notifySpy.called).toBe(true);
            await CockpitApiImpl.refreshHomePage({ post: jest.fn() }, undefined);
            return expect(emtpyDataSpy.called).toBe(true);
        });
    });
    describe('getUIApps', () => {
        it('can getUIApps', () => {
            sandbox.stub(CockpitApiImpl.entries, 'current').value([
                { type: project_1.ItemType.MDKApplication },
                { type: project_1.ItemType.UI5Application },
                { type: project_1.ItemType.MDKPage }
            ]);
            expect(CockpitApiImpl.getUIApps().length).toBe(2);
        });
    });
    describe('triggerValidationFor', () => {
        it('can exit if received mismatched info', () => {
            const validateStub = sandbox.stub(Validator, 'validate');
            CockpitApiImpl.triggerValidationFor(['evt'], [], fakeProjApi);
            expect(validateStub.called).toBe(false);
        });
        it('can vadliate by file', () => {
            const validateStub = sandbox.stub(Validator, 'getModuleInfoFromFilePath');
            CockpitApiImpl.triggerValidationFor(['evt', 'evt'], ['f1', 'f1'], fakeProjApi);
            expect(validateStub.called).toBe(true);
        });
    });
    describe('parseModuleLinks', () => {
        const dbMod = { path: 'db', type: project_1.ModuleType.CAP };
        const srvMod = { path: 'srv', type: project_1.ModuleType.CAP };
        const curEntries = [{ type: project_1.ItemType.CAPService }];
        it('can parse CAP Mod', () => {
            const entriesStub = sandbox.stub(CockpitApiImpl, 'entries');
            const depResolverStub = sandbox.stub(DependencyResolver, 'getDirectDependenciesOf').returns([
                { type: project_1.ItemType.MDKApplication, path: 'app/test/' },
                { type: project_1.ItemType.MDKApplication, path: 'fake/test/' },
            ]);
            CockpitApiImpl.parseModuleLinks([dbMod]);
            expect(depResolverStub.called).toBe(false);
            CockpitApiImpl.parseModuleLinks([srvMod]);
            entriesStub.value({ current: [] });
            expect(depResolverStub.called).toBe(false);
            entriesStub.reset();
            entriesStub.value({ current: curEntries });
            CockpitApiImpl.parseModuleLinks([srvMod]);
            expect(depResolverStub.called).toBe(true);
        });
    });
    describe('populateItemsInfo', () => {
        it('can populateItemsInfo', async () => {
            const countSpy = sandbox.stub(SampleDataUtil, 'countEntries').returns(1);
            const projApiSyp = sandbox.stub(fakeProjApi, 'getDetailInfo').returns(Promise.resolve({}));
            const items = [
                { type: project_1.ItemType.CDSEntity, ref: 'test1' },
                { type: project_1.ItemType.CSVFile, ref: 'test2' },
                { type: project_1.ItemType.SecurityRole, ref: 'test3' },
            ];
            await CockpitApiImpl.populateItemsInfo(items, fakeProjApi);
            expect(projApiSyp.called).toBe(true);
            expect(countSpy.called).toBe(true);
            countSpy.reset();
            countSpy.returns(Promise.reject());
            await CockpitApiImpl.populateItemsInfo(items, fakeProjApi);
        });
    });
    describe('countCockpitEntries', () => {
        it('can countCockpitEntries', () => {
            const sample = { DataModel: { entries: [] }, Service: { entries: [{}] } };
            expect(CockpitApiImpl.countCockpitEntries(sample)).toBe(1);
        });
    });
});
//# sourceMappingURL=CockpitApiImpl.spec.js.map