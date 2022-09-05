"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const WorkspaceUtil = require("../../../libs/Workspace");
const vscode_1 = require("vscode");
const fake_1 = require("../../../test/mocks/fake");
describe('Workspace', () => {
    let cmdSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        cmdSpy = sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.resolve(0));
    });
    afterEach(() => sandbox.restore());
    it('can detect workspace', () => {
        sandbox.stub(vscode_1.workspace, 'workspaceFolders').value([fake_1.fakeWorkspaceFolder]);
        expect(WorkspaceUtil.noWorkspace()).toBe(false);
        sandbox.stub(vscode_1.workspace, 'workspaceFolders').value([]);
        expect(WorkspaceUtil.noWorkspace()).toBe(true);
    });
    it('can get rootFolder', () => {
        const noWsStub = sandbox.stub(WorkspaceUtil, 'noWorkspace').returns(true);
        expect(() => WorkspaceUtil.rootFolder()).toThrowError();
        sandbox.stub(vscode_1.workspace, 'workspaceFolders').value([fake_1.fakeWorkspaceFolder]);
        noWsStub.reset();
        noWsStub.returns(false);
        expect(WorkspaceUtil.rootFolder()).toBeTruthy();
    });
    it('can parse uri', () => {
        sandbox.stub(WorkspaceUtil, 'noWorkspace').returns(false);
        const rootFolderSpy = sandbox.stub(WorkspaceUtil, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        expect(WorkspaceUtil.from([''])).toBeTruthy();
        WorkspaceUtil.from([''], true);
        expect(rootFolderSpy.called).toBe(true);
    });
});
//# sourceMappingURL=Workspace.spec.js.map