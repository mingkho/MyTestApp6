"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WorkspaceUtil = require("../../../../libs/Workspace");
const MDKCommon = require("../../../../libs/Common/MDKCommon");
const sinon_1 = require("sinon");
const fake_1 = require("../../../../test/mocks/fake");
const CommandsUtil = require("../../../../libs/Commands");
const CockpitApiImpl = require("../../../../libs/CockpitApi/CockpitApiImpl");
const project_1 = require("project");
const fs = require("fs");
describe('MDKCommon', () => {
    let existsStub;
    let changedMdkStub;
    let rootStub;
    let noWsStub;
    let getUIAppsStub;
    let statStub;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        statStub = sandbox.stub(fs, 'statSync').returns({ mtime: 1 });
        rootStub = sandbox.stub(WorkspaceUtil, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        noWsStub = sandbox.stub(WorkspaceUtil, 'noWorkspace').returns(false);
        existsStub = sandbox.stub(CommandsUtil, 'exists').returns(true);
        changedMdkStub = sandbox.stub(CockpitApiImpl, 'changedMdkApps').value({ current: { 'a/b': true } });
        getUIAppsStub = sandbox.stub(CockpitApiImpl, 'getUIApps')
            .returns([{ ref: 'a/b', path: 'a/b', type: project_1.ItemType.MDKApplication, name: '', tags: [] }]);
    });
    afterEach(() => sandbox.restore());
    it('can update by case', () => {
        const res = MDKCommon.updateMdkByCase();
        expect(res.forceUpdates.length).toBe(0);
        expect(res.normalUpdates.length).toBe(1);
    });
    it('can detect non-exist bundle', () => {
        existsStub.reset();
        existsStub.returns(false);
        let res = MDKCommon.updateMdkByCase();
        expect(res.forceUpdates.length).toBe(1);
        expect(res.normalUpdates.length).toBe(0);
        changedMdkStub.reset();
        changedMdkStub.value({ current: {} });
        res = MDKCommon.updateMdkByCase();
        expect(res.forceUpdates.length).toBe(1);
        expect(res.normalUpdates.length).toBe(0);
    });
    it('can force update', () => {
        changedMdkStub.reset();
        changedMdkStub.value({ current: {} });
        sandbox.stub(MDKCommon, 'needRefreshResource').returns(false);
        const res = MDKCommon.updateMdkByCase();
        expect(res.forceUpdates.length).toBe(0);
        expect(res.normalUpdates.length).toBe(0);
    });
    it('can detect the change of img', () => {
        let count = 0;
        statStub.reset();
        statStub.callsFake(() => ({ mtime: count++ }));
        expect(MDKCommon.needRefreshResource('')).toBe(true);
    });
    it('can detect the change of projJson', () => {
        let count = 0;
        let isFirst = true;
        existsStub.reset();
        existsStub.callsFake(() => {
            if (isFirst) {
                return isFirst = false;
            }
            else {
                return true;
            }
        });
        statStub.reset();
        statStub.callsFake(() => ({ mtime: count++ }));
        expect(MDKCommon.needRefreshResource('')).toBe(true);
    });
    it('can exist if no change of img or projJson', () => {
        existsStub.reset();
        existsStub.returns(false);
        expect(MDKCommon.needRefreshResource('')).toBe(true);
    });
    it('can handle error and return', () => {
        statStub.reset();
        statStub.throws();
        expect(MDKCommon.needRefreshResource('')).toBe(true);
    });
});
//# sourceMappingURL=MDKCommon.spec.js.map