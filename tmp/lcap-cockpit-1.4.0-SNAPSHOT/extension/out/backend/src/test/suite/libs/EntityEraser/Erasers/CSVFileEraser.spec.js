"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const fs_1 = require("fs");
const Erasers_1 = require("../../../../../libs/EntityEraser/Erasers");
const CommonCrud_1 = require("../../../../../../../common/src/CommonCrud");
describe('CSVFileEraser', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    const inst = (0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.CSVFile);
    it('can erase', async () => {
        const unlinkStub = sandbox.stub(fs_1.promises, 'unlink');
        unlinkStub.returns(Promise.resolve());
        await inst.erase({}).then(res => expect(res).toBeTruthy());
        unlinkStub.returns(Promise.reject());
        await inst.erase({}).catch(res => expect(res).toBeTruthy());
    });
});
//# sourceMappingURL=CSVFileEraser.spec.js.map