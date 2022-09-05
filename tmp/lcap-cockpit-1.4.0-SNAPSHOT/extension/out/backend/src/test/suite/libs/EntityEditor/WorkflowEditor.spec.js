"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const WorkflowEditor_1 = require("../../../../libs/EntityEditor/WorkflowEditor");
const fake_1 = require("../../../../test/mocks/fake");
const WattDelegateEditor_1 = require("../../../../libs/EntityEditor/WattDelegateEditor");
describe('WorkflowEditor', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let inst;
    let wattSpy;
    beforeEach(() => {
        inst = new WorkflowEditor_1.default();
        wattSpy = sandbox.spy(WattDelegateEditor_1.default.prototype, 'exec');
    });
    afterEach(() => sandbox.restore());
    it('can be executed', async () => {
        await inst.exec(fake_1.fakeUri);
        return expect(wattSpy.called).toBe(true);
    });
});
//# sourceMappingURL=WorkflowEditor.spec.js.map