"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityRoleCreator = void 0;
const vscode_1 = require("vscode");
const AuthorizationEditorApi_1 = require("../CommonCrudLibs/AuthorizationEditorApi");
class SecurityRoleCreator {
    async exec() {
        const args = { command: AuthorizationEditorApi_1.LcapAuthEditorCmdTypes.AddRole };
        return vscode_1.commands.executeCommand(AuthorizationEditorApi_1.LCAP_AUTH_EDITOR_CMD.OPEN, args);
    }
}
exports.SecurityRoleCreator = SecurityRoleCreator;
//# sourceMappingURL=SecurityRoleCreator.js.map