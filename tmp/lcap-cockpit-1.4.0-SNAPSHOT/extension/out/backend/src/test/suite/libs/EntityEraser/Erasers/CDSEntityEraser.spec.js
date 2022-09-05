"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const Erasers_1 = require("../../../../../libs/EntityEraser/Erasers");
const CommonCrud_1 = require("../../../../../../../common/src/CommonCrud");
const commonCDSErase = require("./../../../../../libs/EntityEraser/Erasers/commonCDSErase");
const CdsApi = require("../../../../../libs/CommonCrudLibs/CDSGraphicalModelerApi");
describe('CDSEntityEraser', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    const inst = (0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.CDSEntity);
    it('can erase', async () => {
        const eraseStub = sandbox.stub(commonCDSErase, 'commonCDSErase');
        sandbox.stub(CdsApi, 'getQualifiedNameOf');
        await inst.erase({});
        expect(eraseStub.called).toBe(true);
    });
});
//# sourceMappingURL=CDSEntityEraser.spec.js.map