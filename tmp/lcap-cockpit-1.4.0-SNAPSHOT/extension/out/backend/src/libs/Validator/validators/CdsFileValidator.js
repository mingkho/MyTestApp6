"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationStatus_1 = require("../../../../../common/src/ValidationStatus");
const project_1 = require("project");
class CdsFileValidator {
    /**
     * @param uri The VSCode Uri of a *.cds file.
     */
    constructor(uri) {
        this.uri = uri;
    }
    validateViaLib() {
        return project_1.NPMUtil.getCDSPath()
            .then(cdsPath => {
            if (!cdsPath) {
                return ValidationStatus_1.ValidationStatus.Unknown;
            }
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const cds = require(cdsPath);
            return cds.compile(`file:${this.uri.fsPath}`)
                .then(() => ValidationStatus_1.ValidationStatus.Valid)
                .catch(() => ValidationStatus_1.ValidationStatus.Invalid);
        })
            .catch(() => ValidationStatus_1.ValidationStatus.Unknown);
    }
    validate() {
        return this.validateViaLib();
    }
}
exports.default = CdsFileValidator;
//# sourceMappingURL=CdsFileValidator.js.map