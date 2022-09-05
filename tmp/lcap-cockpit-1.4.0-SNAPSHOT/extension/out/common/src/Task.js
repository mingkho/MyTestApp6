"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewModes = exports.TaskStates = exports.HomepageTasks = void 0;
var HomepageTasks;
(function (HomepageTasks) {
    HomepageTasks["TestRun"] = "test-run";
    HomepageTasks["Deploy"] = "deploy";
})(HomepageTasks = exports.HomepageTasks || (exports.HomepageTasks = {}));
var TaskStates;
(function (TaskStates) {
    TaskStates[TaskStates["Running"] = 0] = "Running";
    TaskStates[TaskStates["Stopped"] = 1] = "Stopped";
})(TaskStates = exports.TaskStates || (exports.TaskStates = {}));
var PreviewModes;
(function (PreviewModes) {
    PreviewModes["WithMock"] = "with local mock data";
    PreviewModes["WithRemote"] = "with remote real data";
})(PreviewModes = exports.PreviewModes || (exports.PreviewModes = {}));
//# sourceMappingURL=Task.js.map