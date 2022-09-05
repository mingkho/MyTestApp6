"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSrvCds = exports.prepSrvCdsForExtEnt = exports.prepareDbCds = exports.prependNsTo = exports.hasSrv = exports.hasNs = exports.validateCdsFile = exports.statOrCreateCds = exports.getDefaultSrvName = exports.getDefaultDbNs = void 0;
const fs_1 = require("fs");
const ProjectClient_1 = require("../ProjectClient");
const DB_FILE_PATH = 'db/schema.cds';
const SRV_FILE_PATH = 'srv/service.cds';
const E_NO_PROJECT_API_FS = 'No ProjectApi#fs';
const getDefaultDbNs = (projName) => `sap.lcap.${projName}`;
exports.getDefaultDbNs = getDefaultDbNs;
const getDefaultSrvName = (projName) => `${projName}Service`;
exports.getDefaultSrvName = getDefaultSrvName;
const statOrCreateCds = (absPath, ctnt = '') => fs_1.promises
    .stat(absPath)
    .catch(() => fs_1.promises.writeFile(absPath, ctnt, 'utf-8'))
    .then(() => absPath);
exports.statOrCreateCds = statOrCreateCds;
const validateCdsFile = (absPath, ctntValidator) => fs_1.promises
    .readFile(absPath, 'utf-8')
    .then(ctntValidator)
    .catch(() => false);
exports.validateCdsFile = validateCdsFile;
const hasNs = (absPath) => (0, exports.validateCdsFile)(absPath, ctnt => ctnt.includes('namespace'));
exports.hasNs = hasNs;
const hasSrv = (absPath) => (0, exports.validateCdsFile)(absPath, ctnt => /service\s+\w+?Service/.test(ctnt));
exports.hasSrv = hasSrv;
const prependNsTo = (absPath, ns) => fs_1.promises
    .readFile(absPath, 'utf-8')
    .then(orgCtnt => fs_1.promises
    .writeFile(absPath, [ns, orgCtnt].join("\n"), 'utf-8')
    .then(() => absPath));
exports.prependNsTo = prependNsTo;
const prepareDbCds = (projName, entItemPath, external = false) => ProjectClient_1.ProjectClient.projApi.then(projApi => {
    const fs = projApi === null || projApi === void 0 ? void 0 : projApi.fs();
    return fs
        ? (0, exports.statOrCreateCds)(fs.path(entItemPath || DB_FILE_PATH)).then(absPath => external ? absPath : (0, exports.hasNs)(absPath).then(ok => ok
            ? absPath
            : (0, exports.prependNsTo)(absPath, `namespace ${(0, exports.getDefaultDbNs)(projName)};`)))
        : Promise.reject(E_NO_PROJECT_API_FS);
});
exports.prepareDbCds = prepareDbCds;
const prepSrvCdsForExtEnt = (ns) => ProjectClient_1.ProjectClient.projApi.then(projApi => {
    // eslint-disable-next-line max-len
    const extNSValidator = new RegExp(`using\\s+{\\s*${ns}\\s*}\\s+from\\s+'./external/${ns}.cds';`);
    const fs = projApi === null || projApi === void 0 ? void 0 : projApi.fs();
    return fs
        ? (0, exports.statOrCreateCds)(fs.path(SRV_FILE_PATH)).then(absPath => (0, exports.validateCdsFile)(absPath, ctnt => extNSValidator.test(ctnt)).then(ok => ok
            ? absPath
            : (0, exports.prependNsTo)(absPath, `using {${ns}} from './external/${ns}.cds';`)))
        : Promise.reject(E_NO_PROJECT_API_FS);
});
exports.prepSrvCdsForExtEnt = prepSrvCdsForExtEnt;
const prepareSrvCds = () => ProjectClient_1.ProjectClient.projApi.then(projApi => {
    const fs = projApi === null || projApi === void 0 ? void 0 : projApi.fs();
    return fs
        ? (0, exports.statOrCreateCds)(fs.path(SRV_FILE_PATH))
        : Promise.reject(E_NO_PROJECT_API_FS);
});
exports.prepareSrvCds = prepareSrvCds;
//# sourceMappingURL=CAPUtil.js.map