"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FioriElmsDependencyResolver_1 = require("../../../../libs/DependencyResolver/FioriElmsDependencyResolver");
const sinon_1 = require("sinon");
const vscode_1 = require("vscode");
const notifyUtil = require("../../../../libs/logger/notify");
describe('FioriElmsDependencyResolver', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => sandbox.restore());
    it('can handle error when findUsedEntitiesFor', async () => {
        sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.reject(new Error()));
        const notifySpy = sandbox.spy(notifyUtil, 'notify');
        const list = await (0, FioriElmsDependencyResolver_1.findUsedEntitiesFor)('');
        expect(list).toHaveLength(0);
        expect(notifySpy.called).toBe(true);
    });
});
//# sourceMappingURL=FioriElmsDependencyResolver.spec.js.map