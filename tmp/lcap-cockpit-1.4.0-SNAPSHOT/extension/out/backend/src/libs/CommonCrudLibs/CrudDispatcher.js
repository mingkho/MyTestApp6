"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchCrudOps = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const CommonCrud_1 = require("../../../../common/src/CommonCrud");
const EntityCreater_1 = require("../EntityCreater");
const EntityEditor_1 = require("../EntityEditor");
const EraseRequest_1 = require("../EntityEraser/EraseRequest");
const UsageAnalytics_1 = require("../UsageAnalytics");
const objects_1 = require("../UsageAnalytics/objects");
const dispatchCrudOps = (conf) => {
    switch (conf.crudOp) {
        case CommonCrud_1.CrudOps.Create:
            (0, UsageAnalytics_1.trackUsage)(objects_1.HomeEvents.beforeCreate, conf.targetType);
            return (0, EntityCreater_1.create)(conf.targetType, conf.basicSourceItem, ...(conf.restArgs || []));
        case CommonCrud_1.CrudOps.Edit:
            (0, UsageAnalytics_1.trackUsage)(objects_1.HomeEvents.beforeEdit, conf.targetType);
            return (0, EntityEditor_1.edit)(conf.targetType, conf.basicSourceItem);
        case CommonCrud_1.CrudOps.Delete:
            (0, UsageAnalytics_1.trackUsage)(objects_1.HomeEvents.beforeDelete, conf.basicSourceItem.type, conf.basicSourceItem.ref);
            return (0, EraseRequest_1.eraseEntity)(conf.basicSourceItem);
        default:
            return Promise.reject('This operation is not supported yet');
    }
};
exports.dispatchCrudOps = dispatchCrudOps;
//# sourceMappingURL=CrudDispatcher.js.map