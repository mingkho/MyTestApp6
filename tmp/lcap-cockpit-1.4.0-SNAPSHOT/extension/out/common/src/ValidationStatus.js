"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationLabelMap = exports.ValidationStatus = void 0;
var ValidationStatus;
(function (ValidationStatus) {
    ValidationStatus[ValidationStatus["Valid"] = 0] = "Valid";
    ValidationStatus[ValidationStatus["PartialValid"] = 1] = "PartialValid";
    ValidationStatus[ValidationStatus["Invalid"] = 2] = "Invalid";
    ValidationStatus[ValidationStatus["Unknown"] = 3] = "Unknown";
})(ValidationStatus = exports.ValidationStatus || (exports.ValidationStatus = {}));
exports.validationLabelMap = new Map([
    [ValidationStatus.Valid, 'valid'],
    [ValidationStatus.PartialValid, 'partially valid'],
    [ValidationStatus.Invalid, 'invalid'],
    [ValidationStatus.Unknown, 'unknown'],
]);
//# sourceMappingURL=ValidationStatus.js.map