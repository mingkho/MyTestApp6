"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRunClosePool = exports.testRunCpPool = exports.setTestRunTaskEnv = exports.getTestRunTask = exports.testRunTaskEnv = void 0;
const vscode_1 = require("vscode");
const Task_1 = require("./Task");
const Task_2 = require("../../../common/src/Task");
const MDKCommon_1 = require("../libs/Common/MDKCommon");
exports.testRunTaskEnv = undefined;
const getTestRunTask = () => {
    const options = { cwd: __dirname };
    if (exports.testRunTaskEnv) {
        options['env'] = exports.testRunTaskEnv;
    }
    const updateMdkGroupInfo = (0, MDKCommon_1.updateMdkByCase)();
    (0, MDKCommon_1.trackMdkTools)(updateMdkGroupInfo);
    const taskInst = new vscode_1.Task(Task_1.taskDefMap.get(Task_2.HomepageTasks.TestRun), vscode_1.TaskScope.Workspace, Task_1.taskNameMap[Task_2.HomepageTasks.TestRun], Task_1.HOMEPAGE_TASK_SRC, new vscode_1.ShellExecution((0, Task_1.shellCmdFor)(Task_2.HomepageTasks.TestRun, JSON.stringify(updateMdkGroupInfo)), options));
    taskInst.presentationOptions = Task_1.commonPresentationOpts;
    return taskInst;
};
exports.getTestRunTask = getTestRunTask;
const setTestRunTaskEnv = (testRunEnv) => {
    exports.testRunTaskEnv = testRunEnv;
};
exports.setTestRunTaskEnv = setTestRunTaskEnv;
exports.testRunCpPool = new Set();
exports.testRunClosePool = new Set();
//# sourceMappingURL=testRunTask.js.map