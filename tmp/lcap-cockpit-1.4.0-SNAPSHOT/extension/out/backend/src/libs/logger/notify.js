"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = exports.normalize = exports.NotifyDest = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const vscode_1 = require("vscode");
const loggerImpl_1 = require("./loggerImpl");
var NotifyDest;
(function (NotifyDest) {
    NotifyDest[NotifyDest["ErrMsgBox"] = 0] = "ErrMsgBox";
    NotifyDest[NotifyDest["ErrLog"] = 1] = "ErrLog";
    NotifyDest[NotifyDest["InfoLog"] = 2] = "InfoLog";
    NotifyDest[NotifyDest["DebugLog"] = 3] = "DebugLog";
})(NotifyDest = exports.NotifyDest || (exports.NotifyDest = {}));
const destMap = new Map([
    [NotifyDest.DebugLog, (errMsg) => (0, loggerImpl_1.getLogger)().debug(errMsg)],
    [NotifyDest.InfoLog, (errMsg) => (0, loggerImpl_1.getLogger)().info(errMsg)],
    [NotifyDest.ErrLog, (errMsg) => (0, loggerImpl_1.getLogger)().error(errMsg)],
    [NotifyDest.ErrMsgBox, (errMsg) => vscode_1.window.showErrorMessage(errMsg)],
]);
const stringify = (err) => {
    try {
        const strRes = JSON.stringify(err, Object.getOwnPropertyNames(err), 2);
        return strRes === '{}' ? '' : strRes;
    }
    catch (err) {
        return '';
    }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const normalize = (err) => {
    if (!err) {
        return '';
    }
    if (typeof err === 'string') {
        return err;
    }
    if (err instanceof Buffer) {
        return err.toString();
    }
    const strRes = stringify(err);
    if (strRes) {
        return strRes;
    }
    if (typeof err.toString === 'function' &&
        err.toString !== Object.prototype.toString) {
        return err.toString();
    }
    return '';
};
exports.normalize = normalize;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const notify = (err, ...dests) => {
    const errMsg = (0, exports.normalize)(err);
    dests.forEach(dest => { var _a; return (_a = destMap.get(dest)) === null || _a === void 0 ? void 0 : _a(errMsg); });
    return err;
};
exports.notify = notify;
//# sourceMappingURL=notify.js.map