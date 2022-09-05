"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const CommonCrud_1 = require("../../../../../common/src/CommonCrud");
class MDKAppEraser {
    erase(uri) {
        const dirPath = uri.fsPath.split('Application.app')[0];
        return fs_1.promises.rmdir(dirPath, { recursive: true })
            .then(() => ({ res: CommonCrud_1.EraseResult.SUCCESS }))
            .catch(err => ({ res: CommonCrud_1.EraseResult.FAILURE, msg: err.message }));
    }
}
exports.default = MDKAppEraser;
//# sourceMappingURL=MDKAppEraser.js.map