"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const ValidationStatus_1 = require("../../../../../common/src/ValidationStatus");
const ChildProcess_1 = require("../../ChildProcess/ChildProcess");
class MdkAppValidator {
    /**
     * @param uri The VSCode Uri of MDK App Folder.
     */
    constructor(uri) {
        this.uri = uri;
        this.VALIDATE_CMD = 'mdk.validateApplication';
    }
    validateViaMDKExtension() {
        const isAppFileUri = this.uri.fsPath.endsWith('Application.app');
        return Promise.resolve(vscode_1.commands.executeCommand(this.VALIDATE_CMD, isAppFileUri ? this.uri : vscode_1.Uri.file(`${this.uri.fsPath}/Application.app`)));
    }
    validateViaMDKTools() {
        return (0, ChildProcess_1.exec)(`mdk validate --project ${this.uri.fsPath}`);
    }
    parseTextResult(res) {
        if (/Error:/.test(res)) {
            return ValidationStatus_1.ValidationStatus.Invalid;
        }
        const matchedRes = /End validation with.+?- (\d) error\(s\), (\d) warning\(s\)/gi.exec(res);
        if (!matchedRes || !matchedRes[1] || !matchedRes[2]) {
            return ValidationStatus_1.ValidationStatus.Unknown;
        }
        return parseInt(matchedRes[1]) > 0 ? ValidationStatus_1.ValidationStatus.Invalid : ValidationStatus_1.ValidationStatus.Valid;
    }
    validate(mode = 'viaCLI') {
        return (mode === 'viaExt' ? this.validateViaMDKExtension() : this.validateViaMDKTools())
            .then(res => this.parseTextResult(res))
            .catch(err => this.parseTextResult(err));
    }
}
exports.default = MdkAppValidator;
//# sourceMappingURL=MdkAppValidtor.js.map