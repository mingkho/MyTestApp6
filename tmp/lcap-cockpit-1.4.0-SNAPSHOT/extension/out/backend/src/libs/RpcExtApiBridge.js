"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcExtApi = void 0;
const rpc_extension_1 = require("@sap-devx/webview-rpc/out.ext/rpc-extension");
const vscode_1 = require("vscode");
/* eslint-disable  @typescript-eslint/no-explicit-any */
class RpcExtApi {
    constructor(webview, rpc = new rpc_extension_1.RpcExtension(webview)) {
        this.rpc = rpc;
    }
    request(url, payload) {
        return this.rpc.invoke(url, payload);
    }
    decorateWithMsg(endpoint) {
        return {
            name: endpoint.name,
            func: (...args) => vscode_1.window.withProgress({
                location: vscode_1.ProgressLocation.Window,
                cancellable: false,
                title: endpoint.startMsg
            }, prog => {
                prog.report({ increment: 0 });
                return new Promise((res, rej) => {
                    try {
                        res(endpoint.func(...args));
                    }
                    catch (err) {
                        rej(err);
                    }
                }).then(resp => {
                    prog.report({ increment: 100 });
                    return resp;
                }).catch(() => {
                    prog.report({ increment: 100 });
                });
            }),
        };
    }
    get(endpoint, payload) {
        return this.request(endpoint, payload);
    }
    post(endpoint, payload) {
        return this.request(endpoint, payload);
    }
    patch(endpoint, payload) {
        return this.request(endpoint, payload);
    }
    delete(endpoint, payload) {
        return this.request(endpoint, payload);
    }
    dispatch(endpoint) { this.rpc.registerMethod(this.decorateWithMsg(endpoint)); }
}
exports.RpcExtApi = RpcExtApi;
//# sourceMappingURL=RpcExtApiBridge.js.map