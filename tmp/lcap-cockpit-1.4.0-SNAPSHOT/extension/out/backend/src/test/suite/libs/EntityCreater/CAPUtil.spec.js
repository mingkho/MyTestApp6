"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const fs_1 = require("fs");
const CAPUtil = require("../../../../libs/EntityCreater/CAPUtil");
const fake_1 = require("../../../mocks/fake");
const project_1 = require("project");
const ProjectClient_1 = require("../../../../libs/ProjectClient");
describe('CAPUtil', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        sandbox.restore();
    });
    describe('hasNs', () => {
        it('can examine existence of namespace keywords', () => {
            sandbox.stub(fs_1.promises, 'readFile').returns(Promise.resolve('namespace foobar;'));
            return CAPUtil.hasNs('').then(res => expect(res).toBe(true));
        });
        it('can examine non-existence of namespace keywords', () => {
            sandbox.stub(fs_1.promises, 'readFile').returns(Promise.resolve('nameFooBarspace foobar;'));
            return CAPUtil.hasNs('').then(res => expect(res).toBe(false));
        });
        it('can handle file error', () => {
            sandbox.stub(fs_1.promises, 'readFile').returns(Promise.reject('foobar Error'));
            return CAPUtil.hasNs('').then(res => expect(res).toBe(false));
        });
    });
    describe('hasSrv', () => {
        it('can examine existence of Service keywords', () => {
            sandbox.stub(fs_1.promises, 'readFile').returns(Promise.resolve('service foobarService'));
            return CAPUtil.hasSrv('').then(res => expect(res).toBe(true));
        });
        it('can examine non-existence of namespace keywords', () => {
            sandbox.stub(fs_1.promises, 'readFile').returns(Promise.resolve('serviceQWEfoobarSeQWErvice'));
            return CAPUtil.hasSrv('').then(res => expect(res).toBe(false));
        });
        it('can handle file error', () => {
            sandbox.stub(fs_1.promises, 'readFile').returns(Promise.reject('foobar Error'));
            return CAPUtil.hasSrv('').then(res => expect(res).toBe(false));
        });
    });
    describe('getDefaultDbNs', () => {
        it('return expected value', () => expect(CAPUtil.getDefaultDbNs('foobar')).toEqual('sap.lcap.foobar'));
    });
    describe('getDefaultSrvName', () => {
        it('return expected value', () => expect(CAPUtil.getDefaultSrvName('foobar')).toEqual('foobarService'));
    });
    describe('statOrCreateCds', () => {
        it('can return the existence of a file', () => {
            sandbox.stub(fs_1.promises, 'stat').returns(Promise.resolve(fake_1.fakeStatBase));
            CAPUtil.statOrCreateCds('/tmp/foobar').then(p => expect(p).toEqual('/tmp/foobar'));
        });
        it('can handle errors', () => {
            sandbox.stub(fs_1.promises, 'stat').returns(Promise.reject('foobar'));
            const writeFileSpy = sandbox.spy(fs_1.promises, 'writeFile');
            return CAPUtil.statOrCreateCds('/tmp/foobar').then(() => expect(writeFileSpy.called).toBe(true));
        });
    });
    describe('prependNsTo', () => {
        it('can prepend namespace', () => {
            const fp = '/tmp/fooPath';
            const orgTxt = 'orgTxt';
            const ns = 'foobar';
            sandbox.stub(fs_1.promises, 'readFile').returns(Promise.resolve(orgTxt));
            const writeFileStub = sandbox.stub(fs_1.promises, 'writeFile').returns(Promise.resolve());
            CAPUtil.prependNsTo(fp, ns)
                .then(() => expect(writeFileStub.calledWith(fp, [ns, orgTxt].join("\n"))).toBe(true));
        });
        it('can handle errors', () => {
            sandbox.stub(fs_1.promises, 'stat').returns(Promise.reject('foobar'));
            const writeFileSpy = sandbox.spy(fs_1.promises, 'writeFile');
            return CAPUtil.statOrCreateCds('/tmp/foobar').then(() => expect(writeFileSpy.called).toBe(true));
        });
    });
    describe('prepareDbCds', () => {
        const apiWithFs = new project_1.ProjectImpl('.');
        it('can invoke statOrCreateCds if fs presents', () => {
            sandbox.stub(apiWithFs.fs(), 'path').returns('');
            sandbox.stub(CAPUtil, 'hasNs').returns(Promise.resolve(true));
            sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve(apiWithFs));
            const statOrCreateCdsSpy = sandbox.stub(CAPUtil, 'statOrCreateCds').returns(Promise.resolve(''));
            return CAPUtil.prepareDbCds('foobar').then(() => expect(statOrCreateCdsSpy.called).toBe(true));
        });
        it('can add namespace if fs does not present', () => {
            sandbox.stub(apiWithFs.fs(), 'path').returns('');
            sandbox.stub(CAPUtil, 'hasNs').returns(Promise.resolve(false));
            sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve(apiWithFs));
            sandbox.stub(CAPUtil, 'statOrCreateCds').returns(Promise.resolve(''));
            const prependNsToSpy = sandbox.stub(CAPUtil, 'prependNsTo').returns(Promise.resolve(''));
            return CAPUtil.prepareDbCds('foobar').then(() => expect(prependNsToSpy.called).toBe(true));
        });
        it('can exit if fs does not present', () => {
            sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve(undefined));
            return CAPUtil.prepareDbCds('foobar').catch(res => expect(res).toBeTruthy);
        });
    });
    describe('prepareSrvCds', () => {
        const apiWithFs = new project_1.ProjectImpl('.');
        it('can invoke statOrCreateCds if fs presents', () => {
            sandbox.stub(apiWithFs.fs(), 'path').returns('');
            sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve(apiWithFs));
            const statOrCreateCdsSpy = sandbox.stub(CAPUtil, 'statOrCreateCds').returns(Promise.resolve(''));
            return CAPUtil.prepareSrvCds().then(() => expect(statOrCreateCdsSpy.called).toBe(true));
        });
        it('can exit if fs does not present', () => {
            sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve(undefined));
            return CAPUtil.prepareSrvCds().catch(res => expect(res).toBeTruthy);
        });
    });
});
//# sourceMappingURL=CAPUtil.spec.js.map