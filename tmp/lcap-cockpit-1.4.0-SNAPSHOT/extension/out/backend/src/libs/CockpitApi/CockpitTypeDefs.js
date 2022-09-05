"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CockpitCategoryMapping = exports.CockpitTypeDefs = void 0;
const project_1 = require("project");
const CockpitCategories_1 = require("../../../../common/src/CockpitCategories");
exports.CockpitTypeDefs = [
    {
        type: project_1.ItemType.MDKApplication,
        category: CockpitCategories_1.CockpitCategories.UI,
    },
    {
        type: project_1.ItemType.UI5Application,
        category: CockpitCategories_1.CockpitCategories.UI,
    },
    {
        type: project_1.ItemType.CDSEntity,
        category: CockpitCategories_1.CockpitCategories.DataModel,
    },
    {
        type: project_1.ItemType.ODataV4ServiceEntity,
        category: CockpitCategories_1.CockpitCategories.Service,
    },
    {
        type: project_1.ItemType.CSVFile,
        category: CockpitCategories_1.CockpitCategories.SampleData,
    },
    {
        type: project_1.ItemType.Workflow,
        category: CockpitCategories_1.CockpitCategories.Workflow,
    },
    {
        type: project_1.ItemType.SecurityRole,
        category: CockpitCategories_1.CockpitCategories.SecurityRole,
    },
];
exports.CockpitCategoryMapping = (() => {
    const map = {};
    for (const cockpitType of exports.CockpitTypeDefs) {
        map[cockpitType.type] = cockpitType;
    }
    return map;
})();
//# sourceMappingURL=CockpitTypeDefs.js.map