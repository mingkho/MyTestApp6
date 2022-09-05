"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitRegexpMap = exports.lcapValidationUnits = exports.LcapValidationUnit = void 0;
var LcapValidationUnit;
(function (LcapValidationUnit) {
    LcapValidationUnit[LcapValidationUnit["CdsInDbDir"] = 0] = "CdsInDbDir";
    LcapValidationUnit[LcapValidationUnit["CdsInSrvDir"] = 1] = "CdsInSrvDir";
    LcapValidationUnit[LcapValidationUnit["CsvInDbDataDir"] = 2] = "CsvInDbDataDir";
    LcapValidationUnit[LcapValidationUnit["FeAppInAppDir"] = 3] = "FeAppInAppDir";
    LcapValidationUnit[LcapValidationUnit["MdkAppInAppDir"] = 4] = "MdkAppInAppDir";
    LcapValidationUnit[LcapValidationUnit["modelInWorkflowDir"] = 5] = "modelInWorkflowDir";
})(LcapValidationUnit = exports.LcapValidationUnit || (exports.LcapValidationUnit = {}));
exports.lcapValidationUnits = [
    LcapValidationUnit.CdsInDbDir,
    LcapValidationUnit.CdsInSrvDir,
    LcapValidationUnit.CsvInDbDataDir,
    LcapValidationUnit.FeAppInAppDir,
    LcapValidationUnit.MdkAppInAppDir,
    LcapValidationUnit.modelInWorkflowDir
];
const MdkPatterns = [
    'Application', 'Actions', 'Globals', 'i18n', 'Images', 'Pages', 'Rules', 'Services', 'Styles'
];
exports.unitRegexpMap = new Map([
    [LcapValidationUnit.CdsInDbDir, () => /^(db.*?cds)$/ig],
    [LcapValidationUnit.CdsInSrvDir, () => /^(srv.*?cds)$/ig],
    [LcapValidationUnit.CsvInDbDataDir, () => /^(db\/data.*?csv)$/ig],
    [LcapValidationUnit.FeAppInAppDir, () => /^(app\/.+?)\/webapp\//ig],
    [
        LcapValidationUnit.MdkAppInAppDir,
        () => new RegExp(`^(app/.+?)/(${MdkPatterns.join('|')})`, 'ig')
    ],
    [LcapValidationUnit.modelInWorkflowDir, () => /^(.+?\.workflow)$/ig],
]);
//# sourceMappingURL=LcapValidationUnit.js.map