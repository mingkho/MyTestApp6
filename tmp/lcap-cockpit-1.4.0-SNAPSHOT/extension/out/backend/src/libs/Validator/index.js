"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProjectValid = exports.validate = exports.validationStatusMap = exports.getDependentModuleInfos = exports.batchByPath = exports.getValidatorFor = exports.getModuleInfoFromFilePath = exports.moduleValidatorFactoryMap = exports.validationQueue = void 0;
const vscode_1 = require("vscode");
const fs_1 = require("fs");
const ValidationStatus_1 = require("../../../../common/src/ValidationStatus");
const CockpitApiImpl_1 = require("../CockpitApi/CockpitApiImpl");
const MdkAppValidtor_1 = require("./validators/MdkAppValidtor");
const ValidationQueue_1 = require("./ValidationQueue");
const LcapValidationUnit_1 = require("./LcapValidationUnit");
const CdsFileValidator_1 = require("./validators/CdsFileValidator");
const project_1 = require("project");
exports.validationQueue = new ValidationQueue_1.default();
exports.moduleValidatorFactoryMap = new Map([
    [LcapValidationUnit_1.LcapValidationUnit.MdkAppInAppDir, (uri) => new MdkAppValidtor_1.default(uri)],
    [LcapValidationUnit_1.LcapValidationUnit.CdsInSrvDir, (uri) => new CdsFileValidator_1.default(uri)],
    [LcapValidationUnit_1.LcapValidationUnit.CdsInDbDir, (uri) => new CdsFileValidator_1.default(uri)],
]);
const getModuleInfoFromFilePath = (relFilePath) => LcapValidationUnit_1.lcapValidationUnits.reduce((info, unit) => {
    if (info.path) {
        return info;
    }
    const regExpFactory = LcapValidationUnit_1.unitRegexpMap.get(unit);
    if (!regExpFactory) {
        return info;
    }
    const result = regExpFactory().exec(relFilePath);
    return result ? { type: unit, path: result[1] } : info;
}, { path: '' });
exports.getModuleInfoFromFilePath = getModuleInfoFromFilePath;
const getValidatorFor = (moduleInfo, projApi) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const validatorFactory = exports.moduleValidatorFactoryMap.get(moduleInfo.type);
    if (!validatorFactory) {
        return;
    }
    const uri = vscode_1.Uri.file(projApi.fs().path(moduleInfo.path));
    return validatorFactory(uri);
};
exports.getValidatorFor = getValidatorFor;
const pathScheduleMap = new Map();
const batchByPath = (relModulePath, validator, wait = 500) => {
    const planned = pathScheduleMap.get(relModulePath);
    planned && clearTimeout(planned);
    pathScheduleMap.set(relModulePath, setTimeout(() => {
        pathScheduleMap.delete(relModulePath);
        exports.validationQueue.enqueue(validator.validate.bind(validator)).then(result => {
            vscode_1.window.showInformationMessage(`${relModulePath} is ${ValidationStatus_1.validationLabelMap.get(result)}`);
            const prevStatus = exports.validationStatusMap.get(relModulePath);
            if (result === prevStatus) {
                return;
            }
            exports.validationStatusMap.set(relModulePath, result);
        });
    }, wait));
};
exports.batchByPath = batchByPath;
const moduleToModuleInfo = (module) => {
    let unitType;
    switch (module.type) {
        case project_1.ModuleType.CAP:
            unitType = module.path.startsWith('db')
                ? LcapValidationUnit_1.LcapValidationUnit.CdsInDbDir
                : LcapValidationUnit_1.LcapValidationUnit.CdsInSrvDir;
            break;
        case project_1.ModuleType.MDK:
            unitType = LcapValidationUnit_1.LcapValidationUnit.MdkAppInAppDir;
            break;
        case project_1.ModuleType.UI5:
            unitType = LcapValidationUnit_1.LcapValidationUnit.FeAppInAppDir;
            break;
        case project_1.ModuleType.Workflow:
            unitType = LcapValidationUnit_1.LcapValidationUnit.modelInWorkflowDir;
            break;
        default:
            unitType = undefined;
            break;
    }
    return { type: unitType, path: module.path };
};
const getDependentModuleInfos = (info) => {
    const deps = [];
    const mod = CockpitApiImpl_1.linkedModules.current.find(m => info.path.startsWith(m.path));
    if (!mod || !mod.links) {
        return deps;
    }
    const pendingDeps = [...mod.links];
    while (pendingDeps.length) {
        const curMod = pendingDeps.pop();
        if (!curMod) {
            continue;
        }
        curMod.links && pendingDeps.push(...curMod.links);
        deps.push(moduleToModuleInfo(curMod));
    }
    return deps.filter(m => (m === null || m === void 0 ? void 0 : m.type) !== undefined);
};
exports.getDependentModuleInfos = getDependentModuleInfos;
exports.validationStatusMap = new Map();
const validate = (relFilePath, projApi) => {
    const moduleInfo = (0, exports.getModuleInfoFromFilePath)(relFilePath);
    if (!moduleInfo || moduleInfo.type === undefined) {
        return;
    }
    const depModuleInfos = (0, exports.getDependentModuleInfos)(moduleInfo);
    const validationMeta = [moduleInfo, ...depModuleInfos]
        .map(info => ({
        moduleInfo: info,
        validator: (0, exports.getValidatorFor)(info, projApi)
    }))
        .filter(meta => meta.validator);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    validationMeta.forEach(meta => (0, exports.batchByPath)(meta.moduleInfo.path, meta.validator));
};
exports.validate = validate;
const isProjectValid = async (uri) => {
    if (!(0, fs_1.existsSync)(uri.fsPath)) {
        return ValidationStatus_1.ValidationStatus.Invalid;
    }
    if (CockpitApiImpl_1.hasPartialInvalid.current) {
        return ValidationStatus_1.ValidationStatus.PartialValid;
    }
    return ValidationStatus_1.ValidationStatus.Valid;
};
exports.isProjectValid = isProjectValid;
//# sourceMappingURL=index.js.map