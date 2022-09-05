"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonCDSErase = void 0;
const CDSGraphicalModelerApi_1 = require("../../../libs/CommonCrudLibs/CDSGraphicalModelerApi");
const vscode_1 = require("vscode");
const commonCDSErase = (uri, type, name) => {
    const res = vscode_1.commands.executeCommand(CDSGraphicalModelerApi_1.CDS_CMDS.DELETE, uri, type, name);
    return Promise.resolve(res);
};
exports.commonCDSErase = commonCDSErase;
//# sourceMappingURL=commonCDSErase.js.map