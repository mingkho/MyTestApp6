"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class WattDelegateEditor {
    exec(uri) {
        return vscode_1.workspace.openTextDocument(uri)
            .then(doc => vscode_1.window.showTextDocument(doc, { preview: false }));
    }
}
exports.default = WattDelegateEditor;
//# sourceMappingURL=WattDelegateEditor.js.map