"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const notify_1 = require("../logger/notify");
const SampleDataUtil_1 = require("../EntityCreater/SampleDataUtil");
class SampleDataEditor {
    exec(uri) {
        (0, notify_1.notify)('open sample data editor for ' + uri.fsPath, notify_1.NotifyDest.InfoLog);
        return (0, SampleDataUtil_1.refreshSampleDataEditor)()
            .then(() => vscode_1.commands.executeCommand("vscode.open", uri));
    }
}
exports.default = SampleDataEditor;
//# sourceMappingURL=SampleDataEditor.js.map