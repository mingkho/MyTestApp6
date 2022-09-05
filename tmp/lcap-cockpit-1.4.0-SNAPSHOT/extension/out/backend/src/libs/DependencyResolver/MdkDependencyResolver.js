"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBackendFor = void 0;
const ChildProcess_1 = require("../ChildProcess/ChildProcess");
const notify_1 = require("../logger/notify");
const E_PARSE = 'There\'s error while parsing result by mdk-tools';
const E_EXEC = 'There\'s error reported by mdk-tools';
const parseBackendFor = (absPath) => (0, ChildProcess_1.exec)(`mdk check --target backend --project ${absPath}`)
    .then(strRes => {
    let res;
    try {
        res = JSON.parse(strRes);
        return res
            .filter(mdkInfo => mdkInfo.cap)
            .map(mdkInfo => mdkInfo.links.map(link => {
            const [serviceName, entityName] = link.entity.split('.');
            return { serviceName, entityName, mdkApp: mdkInfo.mdk.split('/')[0] };
        }))
            .flat();
    }
    catch (err) {
        (0, notify_1.notify)(`${E_PARSE}-${absPath}`, notify_1.NotifyDest.ErrLog);
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
        return [];
    }
}).catch(err => {
    (0, notify_1.notify)(`${E_EXEC}-${absPath}`, notify_1.NotifyDest.ErrLog);
    (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
    return Promise.resolve([]);
});
exports.parseBackendFor = parseBackendFor;
//# sourceMappingURL=MdkDependencyResolver.js.map