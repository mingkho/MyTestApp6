"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LcapDeploy = void 0;
const vscode_1 = require("vscode");
const deployTask_1 = require("../../tasks/deployTask");
const notify_1 = require("../logger/notify");
class LcapDeploy {
    withTask() {
        return vscode_1.tasks.executeTask((0, deployTask_1.getDeployTask)());
    }
    deploy() {
        return Promise.resolve(this.withTask())
            .catch((err) => (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox));
    }
}
exports.LcapDeploy = LcapDeploy;
//# sourceMappingURL=LcapDeploy.js.map