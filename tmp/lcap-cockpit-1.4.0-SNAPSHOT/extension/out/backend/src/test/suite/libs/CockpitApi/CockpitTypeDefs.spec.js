"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CockpitTypeDefs_1 = require("../../../../libs/CockpitApi/CockpitTypeDefs");
describe('CockpitTypeDefs', () => {
    it('has same length to that of map keys', () => {
        expect(Object.keys(CockpitTypeDefs_1.CockpitCategoryMapping).length).toBe(CockpitTypeDefs_1.CockpitTypeDefs.length);
    });
});
//# sourceMappingURL=CockpitTypeDefs.spec.js.map