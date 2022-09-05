"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigWithHybrid = exports.getDestProxiesFrom = exports.odataDestConfig2DestProxy = exports.filterOdataDestConfigs = void 0;
const ProjectClient_1 = require("../../../libs/ProjectClient");
const notify_1 = require("../../../libs/logger/notify");
const filterOdataDestConfigs = (cdsRequires) => Object
    .entries(cdsRequires)
    .filter(([key, item]) => { var _a, _b; return ((_a = item.kind) === null || _a === void 0 ? void 0 : _a.includes('odata')) && ((_b = item.credentials) === null || _b === void 0 ? void 0 : _b.destination); });
exports.filterOdataDestConfigs = filterOdataDestConfigs;
const odataDestConfig2DestProxy = (confs) => confs.map(([key, item]) => ({
    name: `${item.credentials.destination}`,
    url: `https://${item.credentials.destination}.dest`,
    proxyHost: "http://127.0.0.1",
    proxyPort: "8887"
}));
exports.odataDestConfig2DestProxy = odataDestConfig2DestProxy;
const getDestProxiesFrom = (cdsRequires) => {
    if (!cdsRequires) {
        return [];
    }
    const odataDestConfigs = (0, exports.filterOdataDestConfigs)(cdsRequires);
    return (0, exports.odataDestConfig2DestProxy)(odataDestConfigs);
};
exports.getDestProxiesFrom = getDestProxiesFrom;
const getConfigWithHybrid = async () => {
    const prodRequires = await ProjectClient_1.ProjectClient.getProjCdsRequiresEnv('production');
    const prodDestConfigs = (0, exports.filterOdataDestConfigs)(prodRequires);
    const destProxies = (0, exports.getDestProxiesFrom)(prodRequires);
    const destinations = JSON.stringify(destProxies);
    let cds_requires = '{}';
    try {
        const prodDestConfigMap = prodDestConfigs.reduce((m, conf) => (m[conf[0]] = conf[1], m), {});
        cds_requires = JSON.stringify(prodDestConfigMap);
    }
    catch (err) {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
    }
    return { env: { destinations, cds_requires } };
};
exports.getConfigWithHybrid = getConfigWithHybrid;
//# sourceMappingURL=WithRemoteConfig.js.map