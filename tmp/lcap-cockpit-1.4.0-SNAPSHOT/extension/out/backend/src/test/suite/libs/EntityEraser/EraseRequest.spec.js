"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("project");
const sinon_1 = require("sinon");
const DependencyResolver = require("../../../../libs/DependencyResolver");
const EraseRequest_1 = require("../../../../libs/EntityEraser/EraseRequest");
const vscode_1 = require("vscode");
const Workspace = require("../../../../libs/Workspace");
const fake_1 = require("../../../../test/mocks/fake");
describe('EraseRequest', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can eraseEntity', async () => {
        sandbox.stub(Workspace, 'noWorkspace').returns(false);
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        await (0, EraseRequest_1.eraseEntity)({}).catch(err => expect(err).toBeTruthy());
        const depStub = sandbox.stub(DependencyResolver, 'getAllDependenciesOf').returns([{}]);
        await (0, EraseRequest_1.eraseEntity)({ type: project_1.ItemType.CDSEntity }).catch(err => expect(err).toBeTruthy());
        depStub.reset();
        depStub.returns([]);
        const fakeItem = { type: project_1.ItemType.CDSEntity, path: 'test' };
        const cmdStub = sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.resolve('test'));
        await (0, EraseRequest_1.eraseEntity)(fakeItem);
        cmdStub.returns(Promise.reject(''));
        await (0, EraseRequest_1.eraseEntity)(fakeItem);
        cmdStub.returns(Promise.reject('test'));
        await (0, EraseRequest_1.eraseEntity)(fakeItem);
    });
});
//# sourceMappingURL=EraseRequest.spec.js.map