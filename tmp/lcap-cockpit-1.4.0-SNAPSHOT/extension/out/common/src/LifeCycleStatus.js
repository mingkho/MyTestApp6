"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleStatus = void 0;
var LifecycleStatus;
(function (LifecycleStatus) {
    LifecycleStatus[LifecycleStatus["Loading"] = 0] = "Loading";
    LifecycleStatus[LifecycleStatus["NoProject"] = 1] = "NoProject";
    LifecycleStatus[LifecycleStatus["NoRepo"] = 2] = "NoRepo";
    LifecycleStatus[LifecycleStatus["NoRemote"] = 3] = "NoRemote";
    LifecycleStatus[LifecycleStatus["ErrResp"] = 4] = "ErrResp";
    LifecycleStatus[LifecycleStatus["UpToDate"] = 5] = "UpToDate";
    LifecycleStatus[LifecycleStatus["BehindOfRemote"] = 6] = "BehindOfRemote";
    LifecycleStatus[LifecycleStatus["AheadOfRemote"] = 7] = "AheadOfRemote";
    LifecycleStatus[LifecycleStatus["DivergeOfRemote"] = 8] = "DivergeOfRemote";
})(LifecycleStatus = exports.LifecycleStatus || (exports.LifecycleStatus = {}));
//# sourceMappingURL=LifeCycleStatus.js.map