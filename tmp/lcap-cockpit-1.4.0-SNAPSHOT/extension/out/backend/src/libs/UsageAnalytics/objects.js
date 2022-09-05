"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeEvents = exports.TrackerTypes = void 0;
var TrackerTypes;
(function (TrackerTypes) {
    TrackerTypes[TrackerTypes["SWA"] = 0] = "SWA";
})(TrackerTypes = exports.TrackerTypes || (exports.TrackerTypes = {}));
var HomeEvents;
(function (HomeEvents) {
    HomeEvents["BeforeActivate"] = "before activate";
    HomeEvents["ShowHomePanel"] = "show home panel";
    HomeEvents["BeforeDeactivate"] = "before deactivate";
    HomeEvents["InvokeStoryboard"] = "invoke storyboard";
    HomeEvents["StartPreview"] = "start preview";
    HomeEvents["StartDeploy"] = "start deploy";
    HomeEvents["beforeCreate"] = "before create";
    HomeEvents["afterCreate"] = "after create";
    HomeEvents["beforeEdit"] = "before edit";
    HomeEvents["afterEdit"] = "after edit";
    HomeEvents["beforeDelete"] = "before delete";
    HomeEvents["afterDelete"] = "after delete";
    HomeEvents["invokeMdkTools"] = "invoke mdk-tools";
})(HomeEvents = exports.HomeEvents || (exports.HomeEvents = {}));
//# sourceMappingURL=objects.js.map