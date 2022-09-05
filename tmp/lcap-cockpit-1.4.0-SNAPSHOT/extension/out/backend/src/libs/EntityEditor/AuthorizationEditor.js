"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationEditor = void 0;
const vscode_1 = require("vscode");
const AuthorizationEditorApi_1 = require("../CommonCrudLibs/AuthorizationEditorApi");
class AuthorizationEditor {
    exec(uri, item) {
        const args = {
            command: AuthorizationEditorApi_1.LcapAuthEditorCmdTypes.SelectRole,
            userdata: { name: item === null || item === void 0 ? void 0 : item.name }
        };
        return vscode_1.commands.executeCommand(AuthorizationEditorApi_1.LCAP_AUTH_EDITOR_CMD.OPEN, args);
    }
}
exports.AuthorizationEditor = AuthorizationEditor;
//# sourceMappingURL=AuthorizationEditor.js.map