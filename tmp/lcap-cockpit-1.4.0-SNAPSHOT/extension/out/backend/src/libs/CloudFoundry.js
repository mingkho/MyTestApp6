"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCfLogin = exports.hasLoggedIn = exports.login = void 0;
const ChildProcess_1 = require("../libs/ChildProcess/ChildProcess");
const vscode_1 = require("vscode");
var LoginOp;
(function (LoginOp) {
    LoginOp["Login"] = "Log In";
    LoginOp["Cancel"] = "Cancel";
})(LoginOp || (LoginOp = {}));
const login = (onSucceed) => vscode_1.window
    .showInformationMessage('Could not deploy. Login to your Cloud Foundry account and try again.', { modal: false }, LoginOp.Login, LoginOp.Cancel)
    .then((choice) => choice !== LoginOp.Login
    ? Promise.reject('Canceled')
    : (0, exports.handleCfLogin)(onSucceed));
exports.login = login;
const hasLoggedIn = () => {
    return (0, ChildProcess_1.exec)('cf oauth-token')
        .then((token) => token.toString().trim() ? true : false)
        .catch(() => false);
};
exports.hasLoggedIn = hasLoggedIn;
const handleCfLogin = async (onSucceed) => {
    const res = await vscode_1.commands.executeCommand('cf.login');
    if (!res) {
        throw new Error('login failed');
    }
    if (typeof onSucceed === 'function') {
        return onSucceed();
    }
};
exports.handleCfLogin = handleCfLogin;
//# sourceMappingURL=CloudFoundry.js.map