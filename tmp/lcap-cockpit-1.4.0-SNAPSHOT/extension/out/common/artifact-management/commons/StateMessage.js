"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = void 0;
class Info {
    add(messageOrError, moduleType) {
        if (!this.stateMessages) {
            this.stateMessages = [];
        }
        let stateMessage;
        if (messageOrError instanceof Error) {
            let code = '0';
            if (moduleType !== undefined && Info.ModuleCode.get(moduleType) !== undefined) {
                const exceptionCode = Info.ModuleCode.get(moduleType);
                if (exceptionCode !== undefined) {
                    const moduleCode = exceptionCode[0];
                    const errorCodeNumber = exceptionCode[1];
                    code = moduleCode + '_' + errorCodeNumber.toString().padStart(3, '0');
                    Info.ModuleCode.set(moduleType, [moduleCode, errorCodeNumber + 1]);
                }
            }
            stateMessage = {
                code: code,
                description: messageOrError.message,
            };
        }
        else {
            stateMessage = {
                code: messageOrError.code,
                description: messageOrError.description,
            };
        }
        this.stateMessages.push(stateMessage);
        return this;
    }
    getStateMessages() {
        return this.stateMessages;
    }
}
exports.Info = Info;
Info.ModuleCode = new Map([
    ['com.sap.cap', ['cap', 10]],
    ['com.sap.ui', ['ui5', 10]],
    ['com.sap.ui.deployer', ['ui5_deployer', 10]],
    ['com.sap.mdk', ['mdk', 10]],
    ['com.sap.workflow', ['workflow', 10]],
    ['com.sap.security.XsSecurity', ['xs', 10]],
    ['com.sap.cap.XsSecurity', ['capxs', 10]],
]);
//# sourceMappingURL=StateMessage.js.map