"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSwaTracker = void 0;
const swa_for_sapbas_vsx_1 = require("@sap/swa-for-sapbas-vsx");
const notify_1 = require("../../logger/notify");
const Manifest_1 = require("../../Manifest");
const swaInst = { current: undefined };
const initSwaTracker = () => Manifest_1.homePkgJson.current.then(async (meta) => {
    if (!meta) {
        return undefined;
    }
    return swaInst.current || (swaInst.current = new swa_for_sapbas_vsx_1.SWATracker(meta.publisher, meta.name, (err) => {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
    }));
});
exports.initSwaTracker = initSwaTracker;
//# sourceMappingURL=index.js.map