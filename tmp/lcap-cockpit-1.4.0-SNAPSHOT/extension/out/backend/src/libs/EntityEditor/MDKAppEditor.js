"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class MDKAppEditor {
    exec(uri) {
        return vscode_1.commands.executeCommand('mobile.mdk.showmap', uri);
    }
}
exports.default = MDKAppEditor;
//# sourceMappingURL=MDKAppEditor.js.map