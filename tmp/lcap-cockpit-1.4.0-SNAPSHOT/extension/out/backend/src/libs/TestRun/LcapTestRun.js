"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LcapTestRun = void 0;
const vscode_1 = require("vscode");
const testRunTask_1 = require("../../tasks/testRunTask");
class LcapTestRun {
    withTask() {
        return vscode_1.tasks.executeTask((0, testRunTask_1.getTestRunTask)());
    }
    run() {
        return this.withTask();
    }
}
exports.LcapTestRun = LcapTestRun;
//# sourceMappingURL=LcapTestRun.js.map