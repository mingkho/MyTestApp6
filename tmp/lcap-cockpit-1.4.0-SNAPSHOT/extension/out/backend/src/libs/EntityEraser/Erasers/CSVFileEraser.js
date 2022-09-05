"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const CommonCrud_1 = require("../../../../../common/src/CommonCrud");
class CSVFileEraser {
    erase(uri) {
        return fs_1.promises.unlink(uri.fsPath)
            .then(() => ({ res: CommonCrud_1.EraseResult.SUCCESS }))
            .catch(err => ({ res: CommonCrud_1.EraseResult.FAILURE, msg: err.message }));
    }
}
exports.default = CSVFileEraser;
//# sourceMappingURL=CSVFileEraser.js.map