"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationTarget = exports.ViewColumn = exports.TaskScope = exports.Task = exports.ShellExecution = exports.ShellExecutionOptions = exports.tasks = exports.WorkspaceEdit = exports.Position = exports.Range = exports.EventEmitter = exports.TreeItem = exports.TreeItemCollapsibleState = exports.Uri = exports.RelativePattern = exports.workspace = exports.window = exports.ProgressLocation = exports.OutputChannel = exports.extensions = exports.ExtensionContext = exports.Extension = exports.ConfigurationChangeEvent = exports.commands = void 0;
const path = require("path");
const fake_1 = require("./fake");
Object.defineProperty(exports, "ViewColumn", { enumerable: true, get: function () { return fake_1.ViewColumn; } });
const Memento = {
    get: jest.fn(),
    update: jest.fn()
};
const Uri = {
    file: jest.fn(file => file),
    parse: jest.fn(value => ({ fsPath: value }))
};
exports.Uri = Uri;
const Extension = {
    id: "",
    extensionPath: path.join(__dirname, "..", "..", ".."),
    extensionUri: fake_1.fakeUri,
    extensionKind: 1,
    isActive: true,
    packageJSON: {
        sapLicenseUrl: "https://tools.hana.ondemand.com/eula.json"
    },
    exports: {
        registerRunConfig: jest.fn(),
        registerDependency: jest.fn(),
        getLanguageClient: jest.fn()
    },
    activate: jest.fn()
};
exports.Extension = Extension;
const ExtensionContext = {
    subscriptions: [{ dispose: jest.fn() }],
    workspaceState: { ...Memento, keys: jest.fn() },
    globalState: { ...Memento, keys: jest.fn(), setKeysForSync: jest.fn() },
    extensionPath: path.join(__dirname, "..", "..", ".."),
    asAbsolutePath: jest.fn(relativePath => {
        return "";
    }),
    storagePath: "",
    logPath: "",
    globalStoragePath: "",
    extensionUri: undefined,
    environmentVariableCollection: undefined,
    secrets: undefined,
    storageUri: fake_1.fakeUri,
    globalStorageUri: fake_1.fakeUri,
    logUri: fake_1.fakeUri,
    extensionMode: 3,
    extension: Extension
};
exports.ExtensionContext = ExtensionContext;
const OutputChannel = {
    name: "",
    append: jest.fn(value => { }),
    appendLine: jest.fn(value => { }),
    clear: jest.fn(),
    show: jest.fn((preserveFocus) => { }),
    hide: jest.fn(),
    dispose: jest.fn()
};
exports.OutputChannel = OutputChannel;
const window = {
    //createOutputChannel: jest.fn(name => {}),
    createWebviewPanel: jest.fn(() => fake_1.fakeWebviewPanel),
    createOutputChannel: jest.fn(name => {
        jest.fn();
        jest.fn();
        name;
    }),
    getOutputChannel: jest.fn(name => {
        jest.fn();
        jest.fn();
        name;
    }),
    createStatusBarItem: jest.fn(() => ({
        show: jest.fn()
    })),
    showErrorMessage: jest.fn(),
    showWarningMessage: jest.fn(),
    createTextEditorDecorationType: jest.fn(),
    withProgress: jest.fn((options, task) => task({ report: jest.fn() })),
    showInformationMessage: jest.fn((message, ...items) => Promise.resolve({})),
    showQuickPick: jest.fn((items, options) => Promise.resolve({})),
    createTreeView: jest.fn(),
    showTextDocument: jest.fn((uri, options) => { }),
    showInputBox: jest.fn(),
    activeTextEditor: { viewColumn: fake_1.ViewColumn.One }
};
exports.window = window;
const commands = {
    registerCommand: jest.fn((command, callback) => { }),
    executeCommand: jest.fn(() => Promise.resolve()),
    getCommands: async function () {
        return [""];
    }
};
exports.commands = commands;
class Task {
    constructor() {
        this.name = "";
        this.definition = {};
    }
}
exports.Task = Task;
const tasks = {
    executeTask: () => Promise.resolve(),
    registerTaskProvider: jest.fn(),
    taskExecutions: [{ task: new Task }],
    onDidStartTask: jest.fn(),
    onDidEndTask: jest.fn(),
    onDidEndTaskProcess: jest.fn(),
    fetchTasks: jest.fn(() => {
        return [Task];
    })
};
exports.tasks = tasks;
const ShellExecutionOptions = {};
exports.ShellExecutionOptions = ShellExecutionOptions;
class ShellExecution {
    constructor(command, options) { }
}
exports.ShellExecution = ShellExecution;
const TaskScope = { Workspace: true };
exports.TaskScope = TaskScope;
const extensions = {
    getExtension: jest.fn(extensionId => {
        return Extension;
    }),
    all: [],
    onDidChange: jest.fn()
};
exports.extensions = extensions;
const workspace = {
    rootPath: "",
    onDidChangeConfiguration: jest.fn(),
    onDidChangeWorkspaceFolders: jest.fn(),
    getConfiguration: jest.fn(id => {
        return {
            autoUpdate: {
                updateSite: "https://tools.hana.ondemand.com/eula.json",
                enabled: true
            },
            autoCheckUpdates: true,
            get: () => {
                Promise.reject("unimplemented");
            }
        };
    }),
    workspaceFolders: [],
    createFileSystemWatcher: jest.fn(fileUri => {
        return {
            onDidChange: jest.fn(),
            onDidDelete: jest.fn(),
            onDidCreate: jest.fn(),
            dispose: jest.fn()
        };
    }),
    findFiles: jest.fn(aa => {
        return [""];
    }),
    applyEdit: jest.fn(edit => Promise.resolve()),
    openTextDocument: jest.fn(() => Promise.resolve()),
    getWorkspaceFolder: jest.fn()
};
exports.workspace = workspace;
const ConfigurationChangeEvent = {
    affectsConfiguration: jest.fn((section, resource) => {
        return true;
    })
};
exports.ConfigurationChangeEvent = ConfigurationChangeEvent;
const ProgressLocation = {
    SourceControl: 1,
    Window: 10,
    Notification: 15
};
exports.ProgressLocation = ProgressLocation;
var TreeItemCollapsibleState;
(function (TreeItemCollapsibleState) {
    /**
     * Determines an item can be neither collapsed nor expanded. Implies it has no children.
     */
    TreeItemCollapsibleState[TreeItemCollapsibleState["None"] = 0] = "None";
    /**
     * Determines an item is collapsed
     */
    TreeItemCollapsibleState[TreeItemCollapsibleState["Collapsed"] = 1] = "Collapsed";
    /**
     * Determines an item is expanded
     */
    TreeItemCollapsibleState[TreeItemCollapsibleState["Expanded"] = 2] = "Expanded";
})(TreeItemCollapsibleState || (TreeItemCollapsibleState = {}));
exports.TreeItemCollapsibleState = TreeItemCollapsibleState;
class TreeItem {
    constructor(label, collapsibleState) { }
}
exports.TreeItem = TreeItem;
class EventEmitter {
    constructor() {
        this.event = jest.fn();
        this.fire = jest.fn();
        this.dispose = jest.fn();
    }
}
exports.EventEmitter = EventEmitter;
class Range {
    constructor(startLine, startCharacter, endLine, endCharacter) {
        this.start = new Position(startLine, startCharacter);
        this.end = new Position(endLine, endCharacter);
    }
}
exports.Range = Range;
class Position {
    constructor(line, character) {
        this.line = line;
        this.character = character;
    }
}
exports.Position = Position;
class WorkspaceEdit {
    constructor() { }
    insert() { }
}
exports.WorkspaceEdit = WorkspaceEdit;
class RelativePattern {
    constructor(base, pattern) {
        this.base = "";
        this.pattern = "";
    }
}
exports.RelativePattern = RelativePattern;
var ConfigurationTarget;
(function (ConfigurationTarget) {
    ConfigurationTarget[ConfigurationTarget["Global"] = 1] = "Global";
    ConfigurationTarget[ConfigurationTarget["Workspace"] = 2] = "Workspace";
    ConfigurationTarget[ConfigurationTarget["WorkspaceFolder"] = 3] = "WorkspaceFolder";
})(ConfigurationTarget = exports.ConfigurationTarget || (exports.ConfigurationTarget = {}));
//# sourceMappingURL=mockVSCode.js.map