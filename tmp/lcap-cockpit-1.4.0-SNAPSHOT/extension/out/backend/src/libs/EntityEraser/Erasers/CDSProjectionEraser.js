"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CDSGraphicalModelerApi_1 = require("../../../libs/CommonCrudLibs/CDSGraphicalModelerApi");
const commonCDSErase_1 = require("./commonCDSErase");
class CDSProjectionEraser {
    erase(uri, type, item) {
        return (0, commonCDSErase_1.commonCDSErase)(uri, type, (0, CDSGraphicalModelerApi_1.getQualifiedNameOf)(item));
    }
}
exports.default = CDSProjectionEraser;
//# sourceMappingURL=CDSProjectionEraser.js.map