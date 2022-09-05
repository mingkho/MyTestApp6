"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const CommonCrud_1 = require("../../../../../common/src/CommonCrud");
const notify_1 = require("../../../libs/logger/notify");
class FioriElementsAppEraser {
    constructor() {
        this.DEL_CMD = 'sap.ux.applicationModeler.deleteCapApp';
    }
    erase(uri) {
        const dirPath = uri.fsPath.split('webapp')[0];
        return Promise.resolve(vscode_1.commands.executeCommand(this.DEL_CMD, vscode_1.Uri.file(dirPath)))
            .then(() => ({ res: CommonCrud_1.EraseResult.SUCCESS }))
            .catch(err => ({ res: CommonCrud_1.EraseResult.FAILURE, msg: (0, notify_1.normalize)(err) }));
    }
}
exports.default = FioriElementsAppEraser;
//# sourceMappingURL=FioriElementsAppEraser.js.map