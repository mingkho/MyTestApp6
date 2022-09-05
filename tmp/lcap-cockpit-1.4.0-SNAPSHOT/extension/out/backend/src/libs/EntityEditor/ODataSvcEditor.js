"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CDSGraphicalModelerApi_1 = require("../CommonCrudLibs/CDSGraphicalModelerApi");
const openWithCdsGM_1 = require("./openWithCdsGM");
class ODataSvcEditor {
    exec(uri, item) {
        return (0, openWithCdsGM_1.openWithCdsGM)([
            uri,
            {
                action: CDSGraphicalModelerApi_1.ActionType.Select,
                targetType: CDSGraphicalModelerApi_1.TargetType.Projection,
                context: item.serviceName,
                targetName: item.name,
            }
        ]);
    }
}
exports.default = ODataSvcEditor;
//# sourceMappingURL=ODataSvcEditor.js.map