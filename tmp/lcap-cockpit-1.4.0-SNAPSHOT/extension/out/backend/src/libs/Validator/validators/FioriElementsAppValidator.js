"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationStatus_1 = require("../../../../../common/src/ValidationStatus");
class FioriElementsAppValidator {
    /**
     * @param uri The VSCode Uri of the root folder of the Fiori Element App.
     */
    constructor(uri) {
        this.uri = uri;
    }
    validate() {
        return Promise.resolve(ValidationStatus_1.ValidationStatus.Unknown);
    }
}
exports.default = FioriElementsAppValidator;
//# sourceMappingURL=FioriElementsAppValidator.js.map