"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshBasApi = exports.APP_TOOLKIT = exports.basAPI = void 0;
const vscode_1 = require("vscode");
exports.basAPI = { current: undefined };
exports.APP_TOOLKIT = { ID: 'SAPOSS.app-studio-toolkit' };
const refreshBasApi = () => {
    const appToolKitExt = vscode_1.extensions.getExtension(exports.APP_TOOLKIT.ID);
    exports.basAPI.current = appToolKitExt === null || appToolKitExt === void 0 ? void 0 : appToolKitExt.exports;
};
exports.refreshBasApi = refreshBasApi;
//# sourceMappingURL=AppToolKit.js.map