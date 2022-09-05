"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class ValidationQueue {
    constructor() {
        this.isRunning = false;
        this.pendingTasks = [];
    }
    exec(task) {
        return vscode_1.window.withProgress({ location: vscode_1.ProgressLocation.Window, title: 'Validating' }, progress => {
            progress.report({ increment: 0 });
            return task.executable()
                .then(data => task.onFulfilled(data))
                .catch(err => task.onRejected(err))
                .finally(() => {
                progress.report({ increment: 100 });
                if (!this.pendingTasks.length) {
                    return this.isRunning = false;
                }
                const nextTask = this.pendingTasks.shift();
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.exec(nextTask);
            });
        });
    }
    enqueue(task) {
        return new Promise((res, rej) => {
            const executableConfig = { executable: task, onFulfilled: res, onRejected: rej };
            if (this.isRunning) {
                return this.pendingTasks.push(executableConfig);
            }
            this.isRunning = true;
            this.exec(executableConfig);
        });
    }
}
exports.default = ValidationQueue;
//# sourceMappingURL=ValidationQueue.js.map