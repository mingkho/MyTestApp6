"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openWithCdsGM = void 0;
const CDSGraphicalModelerApi_1 = require("../CommonCrudLibs/CDSGraphicalModelerApi");
const vscode_1 = require("vscode");
const openWithCdsGM = (payloads) => {
    return vscode_1.commands.executeCommand(CDSGraphicalModelerApi_1.CDS_CMDS.OPEN_WITH_PARAMS, ...payloads);
};
exports.openWithCdsGM = openWithCdsGM;
//# sourceMappingURL=openWithCdsGM.js.map