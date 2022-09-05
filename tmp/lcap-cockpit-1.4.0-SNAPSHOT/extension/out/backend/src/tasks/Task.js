"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellCmdFor = exports.taskFolder = exports.taskNameMap = exports.taskDefMap = exports.commonPresentationOpts = exports.HOMEPAGE_TASK_SRC = exports.LCAP_PROJ_TASK_TYPE = void 0;
const Task_1 = require("../../../common/src/Task");
const path_1 = require("path");
const Workspace_1 = require("../libs/Workspace");
exports.LCAP_PROJ_TASK_TYPE = 'LCAP Project';
exports.HOMEPAGE_TASK_SRC = 'Homepage';
exports.commonPresentationOpts = {
    echo: false,
    showReuseMessage: false,
    clear: false
};
exports.taskDefMap = new Map(Object.values(Task_1.HomepageTasks).map((val) => [
    val,
    { type: exports.LCAP_PROJ_TASK_TYPE, name: val }
]));
exports.taskNameMap = {
    [Task_1.HomepageTasks.Deploy]: 'Deploy',
    [Task_1.HomepageTasks.TestRun]: 'Preview',
};
const taskFolder = (name) => (0, path_1.join)(__dirname, '..', '..', '..', '..', 'scripts', name);
exports.taskFolder = taskFolder;
const shellCmdFor = (name, ...args) => 
// eslint-disable-next-line max-len
`node ${(0, exports.taskFolder)(`${name}.js`)} ${(0, Workspace_1.rootFolder)().uri.fsPath} ${args.map(arg => `'${arg}'`).join(' ')}`;
exports.shellCmdFor = shellCmdFor;
//# sourceMappingURL=Task.js.map