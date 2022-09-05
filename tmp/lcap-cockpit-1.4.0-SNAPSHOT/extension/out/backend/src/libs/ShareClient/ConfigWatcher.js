"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchGitConfig = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const vscode_1 = require("vscode");
const GIT_CONF_PATHS = ['.git', 'config'];
const watchedProjects = new Set();
const watchGitConfig = (projApi, onConfigChanged) => {
    const projectPath = projApi.fs().rootPath;
    if (watchedProjects.has(projectPath)) {
        return;
    }
    const configFilePath = (0, path_1.join)(projectPath, ...GIT_CONF_PATHS);
    if (!(0, fs_1.existsSync)(configFilePath)) {
        return;
    }
    const watcher = vscode_1.workspace.createFileSystemWatcher(configFilePath, false, false, false);
    watcher.onDidChange(onConfigChanged);
    watcher.onDidCreate(onConfigChanged);
    watcher.onDidDelete(onConfigChanged);
    watchedProjects.add(projectPath);
};
exports.watchGitConfig = watchGitConfig;
//# sourceMappingURL=ConfigWatcher.js.map