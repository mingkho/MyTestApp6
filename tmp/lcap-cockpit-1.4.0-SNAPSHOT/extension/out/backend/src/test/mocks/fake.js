"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeWebviewPanel = exports.fakeWebview = exports.fakeStatBase = exports.fakeWorkspaceFolder = exports.fakeUri = exports.fakeProjectClient = exports.fakeProjectData = exports.ViewColumn = void 0;
var ViewColumn;
(function (ViewColumn) {
    ViewColumn[ViewColumn["Active"] = -1] = "Active";
    ViewColumn[ViewColumn["Beside"] = -2] = "Beside";
    ViewColumn[ViewColumn["One"] = 1] = "One";
    ViewColumn[ViewColumn["Two"] = 2] = "Two";
    ViewColumn[ViewColumn["Three"] = 3] = "Three";
    ViewColumn[ViewColumn["Four"] = 4] = "Four";
    ViewColumn[ViewColumn["Five"] = 5] = "Five";
    ViewColumn[ViewColumn["Six"] = 6] = "Six";
    ViewColumn[ViewColumn["Seven"] = 7] = "Seven";
    ViewColumn[ViewColumn["Eight"] = 8] = "Eight";
    ViewColumn[ViewColumn["Nine"] = 9] = "Nine";
})(ViewColumn = exports.ViewColumn || (exports.ViewColumn = {}));
exports.fakeProjectData = {
    name: '',
    prefix: '',
    type: '',
    path: '',
    cloudService: '',
    version: '',
    tags: []
};
exports.fakeProjectClient = {
    projApis: Promise.resolve([]),
    projApi: Promise.resolve(undefined),
    hasProj: Promise.resolve(true),
    watcher: Promise.resolve(undefined),
    getProjInfo: () => Promise.resolve({ hasWorkspace: true, projInfo: exports.fakeProjectData }),
    initAutoBuild: () => undefined,
    setApis: () => { }
};
exports.fakeUri = {
    path: '', scheme: '', authority: '', fsPath: '', query: '', fragment: '', toJSON: jest.fn(), with: jest.fn()
};
exports.fakeWorkspaceFolder = { name: '', index: 0, uri: exports.fakeUri };
exports.fakeStatBase = {
    isFile: () => true,
    isDirectory: () => true,
    isBlockDevice: () => true,
    isCharacterDevice: () => true,
    isSymbolicLink: () => true,
    isFIFO: () => true,
    isSocket: () => true,
    dev: BigInt(1),
    ino: BigInt(1),
    mode: BigInt(1),
    nlink: BigInt(1),
    uid: BigInt(1),
    gid: BigInt(1),
    rdev: BigInt(1),
    size: BigInt(1),
    blksize: BigInt(1),
    blocks: BigInt(1),
    atimeMs: BigInt(1),
    mtimeMs: BigInt(1),
    ctimeMs: BigInt(1),
    birthtimeMs: BigInt(1),
    atimeNs: BigInt(1),
    mtimeNs: BigInt(1),
    ctimeNs: BigInt(1),
    birthtimeNs: BigInt(1),
    atime: new Date(),
    mtime: new Date(),
    ctime: new Date(),
    birthtime: new Date(),
};
exports.fakeWebview = {
    options: {},
    html: '',
    onDidReceiveMessage: jest.fn(),
    postMessage: jest.fn(),
    asWebviewUri: jest.fn(),
    cspSource: '',
};
exports.fakeWebviewPanel = {
    viewType: '',
    title: '',
    iconPath: exports.fakeUri,
    webview: exports.fakeWebview,
    options: { enableFindWidget: true, retainContextWhenHidden: true },
    viewColumn: ViewColumn.Active,
    active: true,
    visible: true,
    onDidChangeViewState: jest.fn(),
    onDidDispose: jest.fn(),
    reveal: jest.fn(),
    dispose: jest.fn()
};
//# sourceMappingURL=fake.js.map