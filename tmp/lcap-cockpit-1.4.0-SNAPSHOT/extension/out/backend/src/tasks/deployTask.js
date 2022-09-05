"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployClosePool = exports.deployCpPool = exports.getDeployTask = void 0;
const vscode_1 = require("vscode");
const Task_1 = require("./Task");
const Task_2 = require("../../../common/src/Task");
const getDeployTask = () => {
    const taskInst = new vscode_1.Task(Task_1.taskDefMap.get(Task_2.HomepageTasks.Deploy), vscode_1.TaskScope.Workspace, Task_1.taskNameMap[Task_2.HomepageTasks.Deploy], Task_1.HOMEPAGE_TASK_SRC, new vscode_1.ShellExecution((0, Task_1.shellCmdFor)(Task_2.HomepageTasks.Deploy), { cwd: __dirname }));
    taskInst.presentationOptions = Task_1.commonPresentationOpts;
    return taskInst;
};
exports.getDeployTask = getDeployTask;
exports.deployCpPool = new Set();
exports.deployClosePool = new Set();
//# sourceMappingURL=deployTask.js.map