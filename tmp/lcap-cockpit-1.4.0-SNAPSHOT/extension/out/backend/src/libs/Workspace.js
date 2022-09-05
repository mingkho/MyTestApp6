"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = exports.rootFolder = exports.noWorkspace = void 0;
const path_1 = require("path");
const vscode_1 = require("vscode");
const noWorkspace = () => !vscode_1.workspace.workspaceFolders ||
    vscode_1.workspace.workspaceFolders.length === 0;
exports.noWorkspace = noWorkspace;
const rootFolder = () => {
    if ((0, exports.noWorkspace)()) {
        throw new Error("no workspace folder opened");
    }
    return vscode_1.workspace.workspaceFolders[0];
};
exports.rootFolder = rootFolder;
const from = (paths, isAbs = false) => {
    return vscode_1.Uri.parse((0, path_1.join)(isAbs ? '' : (0, exports.rootFolder)().uri.fsPath, ...paths));
};
exports.from = from;
//# sourceMappingURL=Workspace.js.map