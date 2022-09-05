"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResp = exports.hasError = void 0;
const notify_1 = require("../logger/notify");
const messages_1 = require("./messages");
const hasError = (resp) => messages_1.errorMessageMap.has(resp) || resp instanceof Error;
exports.hasError = hasError;
const handleErrorResp = (resp) => {
    (0, notify_1.notify)(resp, notify_1.NotifyDest.ErrLog);
    switch (typeof resp) {
        case 'number': {
            const errMsg = messages_1.errorMessageMap.get(resp);
            if (errMsg !== undefined) {
                return errMsg;
            }
            return `Unknown code number received: ${resp}`;
        }
        case 'string': return resp;
        case 'object': {
            if (resp instanceof Error) {
                return resp.message;
            }
            return (0, notify_1.normalize)(resp);
        }
        default: return `Internal Error ${(0, notify_1.normalize)(resp)}`;
    }
};
exports.handleErrorResp = handleErrorResp;
//# sourceMappingURL=RespHandler.js.map