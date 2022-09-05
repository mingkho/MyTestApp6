"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const SampleDataUtil = require("../../../../libs/EntityCreater/SampleDataUtil");
const SampleDataAdapter_1 = require("../../../../libs/EntityCreater/SampleDataAdapter");
const Workspace = require("../../../../libs/Workspace");
const fake_1 = require("../../../mocks/fake");
const vscode_1 = require("vscode");
const notifyUtil = require("../../../../libs/logger/notify");
const fs = require("fs");
const child_process = require("child_process");
const path_1 = require("path");
describe('SampleDataUtil', () => {
    let execSyncSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    it('can be instantiated', () => {
        const inst = new SampleDataAdapter_1.SampleDataAdapter();
        expect(inst).toBeInstanceOf(SampleDataAdapter_1.SampleDataAdapter);
    });
    beforeEach(() => {
        sandbox.stub(SampleDataUtil, 'relDirFor').returns('');
        execSyncSpy = sandbox.stub(child_process, 'execSync').returns(Buffer.from(''));
    });
    afterEach(() => sandbox.restore());
    describe('createSampleDataFile', () => {
        it('can react to user choice', async () => {
            const createCSVForSampleDataSpy = sandbox.spy(SampleDataUtil, 'createCSVForSampleData');
            sandbox.stub(SampleDataUtil, 'cdsdkIsLegacy').value(false);
            sandbox.stub(SampleDataUtil, 'isSampleFileExists').returns(true);
            sandbox.stub(vscode_1.window, 'showInformationMessage').value(jest.fn(() => Promise.resolve('Yes')));
            await SampleDataUtil.createAndShowSampleDataFile('foo', 'bar', 'p');
            return expect(createCSVForSampleDataSpy.called).toBe(true);
        });
        it('exit if cds version too low', () => {
            const notifySpy = sandbox.spy(notifyUtil, 'notify');
            sandbox.stub(SampleDataUtil, 'cdsdkIsLegacy').value(true);
            SampleDataUtil.createAndShowSampleDataFile('foo', 'bar', 'p');
            expect(notifySpy.called).toBe(true);
        });
        it('show override notification if sample data exists', async () => {
            const showInfoMsgSpy = sandbox.spy(vscode_1.window, 'showInformationMessage');
            sandbox.stub(SampleDataUtil, 'cdsdkIsLegacy').value(false);
            sandbox.stub(SampleDataUtil, 'isSampleFileExists').returns(true);
            await SampleDataUtil.createAndShowSampleDataFile('foo', 'bar', 'p');
            return expect(showInfoMsgSpy.called).toBe(true);
        });
        it('can create new csv file', async () => {
            const createCSVForSampleDataSpy = sandbox.spy(SampleDataUtil, 'createCSVForSampleData');
            sandbox.stub(SampleDataUtil, 'cdsdkIsLegacy').value(false);
            sandbox.stub(SampleDataUtil, 'isSampleFileExists').returns(false);
            await SampleDataUtil.createAndShowSampleDataFile('foo', 'bar', 'p');
            return expect(createCSVForSampleDataSpy.called).toBe(true);
        });
        it('can handle error', async () => {
            const notifySpy = sandbox.spy(notifyUtil, 'notify');
            sandbox.stub(SampleDataUtil, 'cdsdkIsLegacy').value(false);
            sandbox.stub(SampleDataUtil, 'isSampleFileExists').returns(false);
            sandbox.stub(SampleDataUtil, 'createCSVForSampleData').throws('');
            await SampleDataUtil.createAndShowSampleDataFile('foo', 'bar', 'p');
            return expect(notifySpy.called).toBe(true);
        });
    });
    describe('isSampleFileExists', () => {
        it('calls existsSync', () => {
            const existsSyncSpy = sandbox.stub(fs, 'existsSync');
            SampleDataUtil.isSampleFileExists('foo', 'bar', true, 'p');
            expect(existsSyncSpy.called).toBe(true);
        });
    });
    describe('createCSVForSampleData', () => {
        it('can pass force as parameter', () => {
            const p = '/tmp', ns = 'ns', entName = 'foo';
            SampleDataUtil.createCSVForSampleData(p, ns, entName, true);
            expect(execSyncSpy.args[0][0].includes('--force')).toBe(true);
            SampleDataUtil.createCSVForSampleData(p, ns, entName);
            expect(!execSyncSpy.args[1][0].includes('--force')).toBe(true);
            execSyncSpy.reset();
            execSyncSpy.throws();
            expect(() => SampleDataUtil.createCSVForSampleData(p, ns, entName)).toThrowError();
        });
    });
    describe('countEntries', () => {
        it('counts the correct lines of csv input', () => {
            const two = SampleDataUtil.countEntries("ID\r\n1\r\n \r\n3\r\n");
            const zero = SampleDataUtil.countEntries("ID");
            const nonNegative = SampleDataUtil.countEntries("");
            expect(two).toBe(2);
            expect(zero).toBe(0);
            expect(nonNegative).toBe(0);
        });
    });
    describe('getCdsdkVer', () => {
        it('can handle error', () => {
            execSyncSpy.throws('err');
            const notifySpy = sandbox.spy(notifyUtil, 'notify');
            SampleDataUtil.getCdsdkVer();
            expect(notifySpy.calledWith(notifyUtil.NotifyDest.ErrLog));
        });
        it('can handle empty result', () => {
            execSyncSpy.returns(Buffer.from(''));
            const notifySpy = sandbox.spy(notifyUtil, 'notify');
            SampleDataUtil.getCdsdkVer();
            expect(notifySpy.calledWith(notifyUtil.NotifyDest.ErrLog));
        });
    });
    describe('dir', () => {
        it('can join the path', () => {
            sandbox.restore();
            sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
            const res = SampleDataUtil.relDirFor();
            expect(res).toBe((0, path_1.join)(fake_1.fakeWorkspaceFolder.uri.fsPath, 'db', 'data'));
        });
    });
});
//# sourceMappingURL=SampleDataUtil.spec.js.map