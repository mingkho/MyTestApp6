"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const EntityCreater = require("../../../../libs/EntityCreater");
const EntityEditor = require("../../../../libs/EntityEditor");
const EntityEraser = require("../../../../libs/EntityEraser/EraseRequest");
const CommonCrud_1 = require("../../../../../../common/src/CommonCrud");
const CrudDispatcher_1 = require("../../../../libs/CommonCrudLibs/CrudDispatcher");
describe('CrudDispatcher', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can dispatchCrudOps', async () => {
        const createStub = sandbox.stub(EntityCreater, 'create');
        const editStub = sandbox.stub(EntityEditor, 'edit');
        const eraseStub = sandbox.stub(EntityEraser, 'eraseEntity');
        (0, CrudDispatcher_1.dispatchCrudOps)({ crudOp: CommonCrud_1.CrudOps.Create });
        expect(createStub.called).toBe(true);
        (0, CrudDispatcher_1.dispatchCrudOps)({ crudOp: CommonCrud_1.CrudOps.Edit });
        expect(editStub.called).toBe(true);
        (0, CrudDispatcher_1.dispatchCrudOps)({ crudOp: CommonCrud_1.CrudOps.Delete, basicSourceItem: { type: 'type', ref: 'ref' } });
        expect(eraseStub.called).toBe(true);
        await (0, CrudDispatcher_1.dispatchCrudOps)({ crudOp: '' }).catch(err => expect(err).toBeTruthy());
    });
});
//# sourceMappingURL=CrudDispatcher.spec.js.map