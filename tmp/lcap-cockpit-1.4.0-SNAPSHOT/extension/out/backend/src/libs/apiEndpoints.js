"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchAllEndpoints = exports.apiEndpoints = void 0;
const RpcApi_1 = require("../../../common/src/RpcApi");
const ProjectClient_1 = require("./ProjectClient");
const init_1 = require("./TestRun/init");
const LifeCycleClient_1 = require("./ShareClient/LifeCycleClient");
const init_2 = require("./Deploy/init");
const Task_1 = require("../../../common/src/Task");
const states_1 = require("../tasks/states");
const Task_2 = require("../tasks/Task");
const CrudDispatcher_1 = require("./CommonCrudLibs/CrudDispatcher");
const GuidedDevInvoker_1 = require("./GuidedDevelopment/GuidedDevInvoker");
const DependencyResolver_1 = require("./DependencyResolver");
const Deploy_1 = require("./Deploy");
const vscode_1 = require("vscode");
const Workspace_1 = require("./Workspace");
exports.apiEndpoints = [
    {
        name: RpcApi_1.ExtEndPoint.deployProj,
        func: () => ProjectClient_1.ProjectClient.hasProj.then(ok => ok && (0, init_2.deployProj)()),
        startMsg: `Start ${Task_2.taskNameMap[Task_1.HomepageTasks.Deploy]}`
    },
    {
        name: RpcApi_1.ExtEndPoint.runProj,
        func: (previewMode) => ProjectClient_1.ProjectClient.hasProj
            .then(ok => ok && (0, init_1.runProj)(previewMode)),
        startMsg: `Start ${Task_2.taskNameMap[Task_1.HomepageTasks.TestRun]}`
    },
    {
        name: RpcApi_1.ExtEndPoint.getProjInfo,
        func: () => ProjectClient_1.ProjectClient.getProjInfo(),
        startMsg: 'Fetching info'
    },
    {
        name: RpcApi_1.ExtEndPoint.createItem,
        func: CrudDispatcher_1.dispatchCrudOps,
        startMsg: 'Creating'
    },
    {
        name: RpcApi_1.ExtEndPoint.visitItem,
        func: CrudDispatcher_1.dispatchCrudOps,
        startMsg: 'Opening'
    },
    {
        name: RpcApi_1.ExtEndPoint.deleteItem,
        func: CrudDispatcher_1.dispatchCrudOps,
        startMsg: 'Deleting'
    },
    {
        name: RpcApi_1.ExtEndPoint.getAllItems,
        func: async () => ProjectClient_1.ProjectClient.getEntityList(),
        startMsg: 'Fetching entries'
    },
    {
        name: RpcApi_1.ExtEndPoint.getDependencies,
        func: async (item) => (0, DependencyResolver_1.getAllDependenciesOf)(item),
        startMsg: 'Fetching dependencies'
    },
    {
        name: RpcApi_1.ExtEndPoint.getAdjList,
        func: async (item) => (0, DependencyResolver_1.getAdjListOf)(item),
        startMsg: 'Fetching adjacency list'
    },
    {
        name: RpcApi_1.ExtEndPoint.lifeCyclePull,
        func: async () => (0, LifeCycleClient_1.pull)(),
        startMsg: 'Start updating'
    },
    {
        name: RpcApi_1.ExtEndPoint.lifeCyclePush,
        func: async () => (0, LifeCycleClient_1.push)(),
        startMsg: 'Start sharing'
    },
    {
        name: RpcApi_1.ExtEndPoint.lifeCycleStatus,
        func: async () => (0, LifeCycleClient_1.status)(),
        startMsg: 'Fetching status'
    },
    {
        name: RpcApi_1.ExtEndPoint.lifeCycleGetRemote,
        func: async (projectPath) => (0, LifeCycleClient_1.getRemote)(projectPath),
        startMsg: 'Fetching sharing link'
    },
    {
        name: RpcApi_1.ExtEndPoint.lifeCycleAddRemote,
        func: async (projectPath) => (0, LifeCycleClient_1.openUI)(projectPath),
        startMsg: 'Enable sharing'
    },
    {
        name: RpcApi_1.ExtEndPoint.lifeCycleGetDeeplinkUrl,
        func: async (projectPath) => (0, LifeCycleClient_1.getDeeplinkUrl)(projectPath),
        startMsg: 'Enable sharing'
    },
    {
        name: RpcApi_1.ExtEndPoint.lifeCycleCountChanges,
        func: async () => (0, LifeCycleClient_1.countFilesChanged)((0, Workspace_1.rootFolder)().uri.fsPath),
        startMsg: ''
    },
    {
        name: RpcApi_1.ExtEndPoint.lifeCycleOpenUI,
        func: async () => (0, LifeCycleClient_1.openUI)((0, Workspace_1.rootFolder)().uri.fsPath),
        startMsg: ''
    },
    {
        name: RpcApi_1.ExtEndPoint.taskState,
        func: (name) => (0, states_1.fetchStateCacheFor)(name),
        startMsg: 'Synchronizing task states'
    },
    {
        name: RpcApi_1.ExtEndPoint.terminateTask,
        func: (name) => (0, states_1.terminate)(name),
        startMsg: 'Stopping task'
    },
    {
        name: RpcApi_1.ExtEndPoint.invokeGuidedDev,
        func: GuidedDevInvoker_1.invokeGuidedDev,
        startMsg: ''
    },
    {
        name: RpcApi_1.ExtEndPoint.getDeployInfo,
        func: Deploy_1.getDeployInfo,
        startMsg: 'Synchronizing deploy link'
    },
    {
        name: RpcApi_1.ExtEndPoint.openUrl,
        func: (url) => vscode_1.commands.executeCommand('vscode.open', vscode_1.Uri.parse(url)),
        startMsg: ''
    },
];
const dispatchAllEndpoints = (apiClient) => exports.apiEndpoints.forEach(endpoint => apiClient.dispatch(endpoint));
exports.dispatchAllEndpoints = dispatchAllEndpoints;
//# sourceMappingURL=apiEndpoints.js.map