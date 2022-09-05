"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyData = void 0;
const CockpitCategories_1 = require("./CockpitCategories");
const getEmptyData = () => {
    const emptyData = {};
    Object.keys(CockpitCategories_1.CockpitCategories).forEach(k => emptyData[k] = { entries: [] });
    return emptyData;
};
exports.getEmptyData = getEmptyData;
//# sourceMappingURL=getEmptyData.js.map