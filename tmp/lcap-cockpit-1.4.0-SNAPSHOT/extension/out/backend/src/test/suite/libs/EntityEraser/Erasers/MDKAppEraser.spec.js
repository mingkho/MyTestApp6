"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const fs_1 = require("fs");
const Erasers_1 = require("../../../../../libs/EntityEraser/Erasers");
const CommonCrud_1 = require("../../../../../../../common/src/CommonCrud");
const fake_1 = require("../../../../../test/mocks/fake");
describe('MDKAppEraser', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    const inst = (0, Erasers_1.getEntityEraser)(CommonCrud_1.ErasableType.MDKApplication);
    it('can erase', async () => {
        const rmStub = sandbox.stub(fs_1.promises, 'rmdir');
        rmStub.returns(Promise.resolve());
        await inst.erase(fake_1.fakeUri).then(res => expect(res).toBeTruthy());
        rmStub.returns(Promise.reject());
        await inst.erase(fake_1.fakeUri).catch(res => expect(res).toBeTruthy());
    });
});
//# sourceMappingURL=MDKAppEraser.spec.js.map