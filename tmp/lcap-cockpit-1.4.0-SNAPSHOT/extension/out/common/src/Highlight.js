"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemAction = exports.CategoryAction = exports.ProjectAction = exports.CommonAction = exports.HighlightElementLevel = exports.HighlightType = void 0;
var HighlightType;
(function (HighlightType) {
    HighlightType["Style"] = "style";
    HighlightType["Comment"] = "comment";
})(HighlightType = exports.HighlightType || (exports.HighlightType = {}));
var HighlightElementLevel;
(function (HighlightElementLevel) {
    HighlightElementLevel["Item"] = "item";
    HighlightElementLevel["Category"] = "category";
    HighlightElementLevel["Project"] = "project";
})(HighlightElementLevel = exports.HighlightElementLevel || (exports.HighlightElementLevel = {}));
var CommonAction;
(function (CommonAction) {
    CommonAction["None"] = "none";
})(CommonAction = exports.CommonAction || (exports.CommonAction = {}));
var ProjectAction;
(function (ProjectAction) {
    ProjectAction["Preview"] = "preview";
    ProjectAction["Deploy"] = "deploy";
    ProjectAction["Run"] = "run";
})(ProjectAction = exports.ProjectAction || (exports.ProjectAction = {}));
var CategoryAction;
(function (CategoryAction) {
    CategoryAction["Create"] = "create";
})(CategoryAction = exports.CategoryAction || (exports.CategoryAction = {}));
var ItemAction;
(function (ItemAction) {
    ItemAction["Edit"] = "edit";
    ItemAction["Delete"] = "delete";
    ItemAction["AddSampleData"] = "addSampleData";
    ItemAction["AddServiceEntity"] = "addServiceEntity";
    ItemAction["Authorization"] = "authorization";
})(ItemAction = exports.ItemAction || (exports.ItemAction = {}));
//# sourceMappingURL=Highlight.js.map