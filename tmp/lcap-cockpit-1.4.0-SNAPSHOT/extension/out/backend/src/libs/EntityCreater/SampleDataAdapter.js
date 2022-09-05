"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleDataAdapter = void 0;
const vscode_1 = require("vscode");
const notify_1 = require("../logger/notify");
const ProjectClient_1 = require("../ProjectClient");
const Workspace_1 = require("../Workspace");
const SampleDataUtil_1 = require("./SampleDataUtil");
const getNsFromEnt = (ent) => ent.namespace || '';
class SampleDataAdapter {
    exec(item, op) {
        let createOrImport = Promise.resolve();
        if (!item) {
            return createOrImport;
        }
        const ns = getNsFromEnt(item);
        const name = item.name;
        if (op === 'Create') {
            createOrImport = (0, SampleDataUtil_1.createAndShowSampleDataFile)(ns, name, (0, Workspace_1.rootFolder)().uri.fsPath, item.external);
        }
        else {
            const wingCapRunExt = vscode_1.extensions.getExtension('SAPSE.vscode-wing-cap-run');
            if (!wingCapRunExt) {
                (0, notify_1.notify)('Missing CAP extension dependency and operation canceled.', notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox);
                return Promise.reject();
            }
            createOrImport = ProjectClient_1.ProjectClient.hasProj
                .then(hasProj => hasProj ? undefined : Promise.reject('No project found'))
                .then(() => wingCapRunExt.exports.importSampleDataFromFile(ns, name, (0, Workspace_1.rootFolder)().uri.fsPath))
                .catch(err => ((0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox),
                Promise.reject(err)));
        }
        return createOrImport.then(() => (0, SampleDataUtil_1.refreshSampleDataEditor)(500));
    }
}
exports.SampleDataAdapter = SampleDataAdapter;
//# sourceMappingURL=SampleDataAdapter.js.map