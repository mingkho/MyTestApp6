"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cateWeights = exports.CockpitCategories = void 0;
var CockpitCategories;
(function (CockpitCategories) {
    CockpitCategories["DataModel"] = "DataModel";
    CockpitCategories["Service"] = "Service";
    CockpitCategories["SampleData"] = "SampleData";
    CockpitCategories["UI"] = "UI";
    CockpitCategories["Workflow"] = "Workflow";
    CockpitCategories["ExternalService"] = "ExternalService";
    CockpitCategories["SecurityRole"] = "SecurityRole";
})(CockpitCategories = exports.CockpitCategories || (exports.CockpitCategories = {}));
exports.cateWeights = [
    CockpitCategories.DataModel,
    CockpitCategories.Service,
    CockpitCategories.SampleData,
    CockpitCategories.UI,
    CockpitCategories.Workflow,
    CockpitCategories.ExternalService,
    CockpitCategories.SecurityRole,
].reduce((map, cate, idx) => map.set(cate, idx), new Map());
//# sourceMappingURL=CockpitCategories.js.map