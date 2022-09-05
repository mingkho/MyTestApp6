"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openWithCdsGM_1 = require("./openWithCdsGM");
const CDSGraphicalModelerApi_1 = require("../CommonCrudLibs/CDSGraphicalModelerApi");
class CDSEntEditor {
    exec(uri, item) {
        return (0, openWithCdsGM_1.openWithCdsGM)([
            uri,
            {
                action: CDSGraphicalModelerApi_1.ActionType.Select,
                targetType: CDSGraphicalModelerApi_1.TargetType.Entity,
                context: item.namespace,
                targetName: item.name,
            }
        ]);
    }
}
exports.default = CDSEntEditor;
//# sourceMappingURL=CDSEntEditor.js.map