"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const CommonCrud_1 = require("../../../../../common/src/CommonCrud");
const notify_1 = require("../../logger/notify");
const AuthorizationEditorApi_1 = require("../../CommonCrudLibs/AuthorizationEditorApi");
class SecurityRoleEraser {
    async erase(uri, type, item) {
        const args = {
            command: AuthorizationEditorApi_1.LcapAuthEditorCmdTypes.DeleteRole,
            userdata: { name: item === null || item === void 0 ? void 0 : item.name }
        };
        return vscode_1.commands.executeCommand(AuthorizationEditorApi_1.LCAP_AUTH_EDITOR_CMD.OPEN, args)
            .then(() => ({ res: CommonCrud_1.EraseResult.SUCCESS }), err => ({ res: CommonCrud_1.EraseResult.FAILURE, msg: (0, notify_1.normalize)(err) }));
    }
}
exports.default = SecurityRoleEraser;
//# sourceMappingURL=SecurityRoleEraser.js.map