"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class FioriElmEditor {
    exec(uri) {
        return vscode_1.commands.executeCommand('sap.ux.pageMap.showMap', { fsPath: uri.fsPath.split('/webapp/')[0] });
    }
}
exports.default = FioriElmEditor;
//# sourceMappingURL=FioriElmEditor.js.map