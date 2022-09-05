"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityCreator_1 = require("../../../../libs/EntityCreater/EntityCreator");
describe('EntityCreator', () => {
    it('cannot be inherited', () => {
        class TestClass extends EntityCreator_1.default {
            exec() { return; }
        }
        ;
        expect(new TestClass).toBeInstanceOf(EntityCreator_1.default);
    });
});
//# sourceMappingURL=EntityCreator.spec.js.map