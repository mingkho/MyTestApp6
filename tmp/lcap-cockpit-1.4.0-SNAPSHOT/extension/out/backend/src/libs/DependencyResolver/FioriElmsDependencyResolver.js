"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsedEntitiesFor = void 0;
const notify_1 = require("../logger/notify");
const vscode_1 = require("vscode");
const FIND_ENTS_CMD = 'sap.ux.applicationModeler.findUsedEntities';
const E_EXEC = 'There\'s error reported by application-modeler';
const findUsedEntitiesFor = async (absPath) => vscode_1.commands.executeCommand(FIND_ENTS_CMD, absPath)
    .then(infos => (infos || []).map(info => ({
    entityName: info.entity,
    servicePath: info.service.replace(/\/$/, ''),
    feApp: absPath
})), err => {
    (0, notify_1.notify)(`${E_EXEC}-${absPath}`, notify_1.NotifyDest.ErrLog);
    (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
    return Promise.resolve([]);
});
exports.findUsedEntitiesFor = findUsedEntitiesFor;
//# sourceMappingURL=FioriElmsDependencyResolver.js.map