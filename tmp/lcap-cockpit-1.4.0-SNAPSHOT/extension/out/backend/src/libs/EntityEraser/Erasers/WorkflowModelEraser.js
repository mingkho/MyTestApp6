"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const CommonCrud_1 = require("../../../../../common/src/CommonCrud");
const notify_1 = require("../../../libs/logger/notify");
class WorkflowModelEraser {
    constructor() {
        this.DEL_CMD = 'workflow.delete';
    }
    erase(uri) {
        return Promise.resolve(vscode_1.commands.executeCommand(this.DEL_CMD, uri))
            .then(result => result)
            .catch(err => ({ res: CommonCrud_1.EraseResult.FAILURE, msg: (0, notify_1.normalize)(err) }));
    }
}
exports.default = WorkflowModelEraser;
//# sourceMappingURL=WorkflowModelEraser.js.map