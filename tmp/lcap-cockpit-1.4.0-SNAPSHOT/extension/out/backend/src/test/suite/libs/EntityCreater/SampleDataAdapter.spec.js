"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const SampleDataUtil = require("../../../../libs/EntityCreater/SampleDataUtil");
const SampleDataAdapter_1 = require("../../../../libs/EntityCreater/SampleDataAdapter");
const notifyUtil = require("../../../../libs/logger/notify");
const vscode_1 = require("vscode");
const mockVSCode_1 = require("./../../../../test/mocks/mockVSCode");
const ProjectClient_1 = require("./../../../../libs/ProjectClient");
const WorkspaceUtil = require("./../../../../libs/Workspace");
const fake_1 = require("./../../../../test/mocks/fake");
describe('SampleDataAdapter', () => {
    let inst;
    const sandbox = (0, sinon_1.createSandbox)();
    it('can be instantiated', () => {
        const inst = new SampleDataAdapter_1.SampleDataAdapter();
        expect(inst).toBeInstanceOf(SampleDataAdapter_1.SampleDataAdapter);
    });
    beforeEach(() => {
        inst = new SampleDataAdapter_1.SampleDataAdapter();
    });
    afterEach(() => sandbox.restore());
    it('conforms EntityCreator Interface', () => expect(typeof inst.exec).toEqual('function'));
    it('exits with args limited args', () => {
        const notifySpy = sandbox.spy(notifyUtil, 'notify');
        return Promise.resolve(inst.exec())
            .catch(() => expect(notifySpy.calledWith('Sample Data Adapter invoked with wrong arguments.')).toBe(true));
    });
    it('can create sample data for local data model', () => {
        sandbox.stub(WorkspaceUtil, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        const createSampleDataFileSpy = sandbox.spy(SampleDataUtil, 'createAndShowSampleDataFile');
        return Promise.resolve(inst.exec({ namespace: 'a', name: 'b' }, 'Create'))
            .catch(() => expect(createSampleDataFileSpy.called).toBe(true));
    });
    it('can create sample data for external data model', () => {
        sandbox.stub(WorkspaceUtil, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        const createSampleDataFileSpy = sandbox.spy(SampleDataUtil, 'createAndShowSampleDataFile');
        return Promise.resolve(inst.exec({ name: 'b' }, 'Create'))
            .catch(() => expect(createSampleDataFileSpy.called).toBe(true));
    });
    it('exits if no cap run extension', () => {
        sandbox.stub(vscode_1.extensions, 'getExtension').returns(undefined);
        const notifySpy = sandbox.spy(notifyUtil, 'notify');
        return Promise.resolve(inst.exec({ namespace: 'a', name: 'b' }))
            .catch(() => expect(notifySpy.called).toBe(true));
    });
    it('exits if no project', () => {
        sandbox.stub(vscode_1.extensions, 'getExtension').returns(mockVSCode_1.Extension);
        sandbox.stub(ProjectClient_1.ProjectClient, 'hasProj').value(Promise.resolve(false));
        const notifySpy = sandbox.spy(notifyUtil, 'notify');
        return Promise.resolve(inst.exec({ namespace: 'a', name: 'b' }))
            .catch(() => expect(notifySpy.called).toBe(true));
    });
    it('can import sample data', () => {
        const fakeExt = { ...mockVSCode_1.Extension, exports: { importSampleDataFromFile: () => { } } };
        const importSpy = sandbox.spy(fakeExt.exports, 'importSampleDataFromFile');
        sandbox.stub(vscode_1.extensions, 'getExtension').returns(fakeExt);
        sandbox.stub(ProjectClient_1.ProjectClient, 'hasProj').value(Promise.resolve(true));
        sandbox.stub(WorkspaceUtil, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        return Promise.resolve(inst.exec({ name: '' }, 'Import'))
            .finally(() => expect(importSpy.called).toBe(true));
    });
});
//# sourceMappingURL=SampleDataAdapter.spec.js.map