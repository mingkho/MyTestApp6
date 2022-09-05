"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeGuidedDev = void 0;
const vscode_1 = require("vscode");
const invokeGuidedDev = () => {
    return Promise.resolve(vscode_1.commands.executeCommand('loadGuidedDevelopment'));
};
exports.invokeGuidedDev = invokeGuidedDev;
//# sourceMappingURL=GuidedDevInvoker.js.map