"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideHomepageTasks = void 0;
const Task_1 = require("../../../common/src/Task");
const deployTask_1 = require("./deployTask");
const Task_2 = require("./Task");
const testRunTask_1 = require("./testRunTask");
const provideHomepageTasks = () => ({
    provideTasks: () => [(0, testRunTask_1.getTestRunTask)(), (0, deployTask_1.getDeployTask)()],
    resolveTask: task => {
        if (task.definition.type !== Task_2.LCAP_PROJ_TASK_TYPE) {
            return undefined;
        }
        switch (task.definition.name) {
            case Task_1.HomepageTasks.TestRun:
                return (0, testRunTask_1.getTestRunTask)();
            case Task_1.HomepageTasks.Deploy:
                return (0, deployTask_1.getDeployTask)();
        }
    }
});
exports.provideHomepageTasks = provideHomepageTasks;
//# sourceMappingURL=index.js.map