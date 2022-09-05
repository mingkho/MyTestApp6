"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rpc_extension_1 = require("@sap-devx/webview-rpc/out.ext/rpc-extension");
const sinon_1 = require("sinon");
const RpcExtApiBridge_1 = require("../../../libs/RpcExtApiBridge");
const fake_1 = require("../../mocks/fake");
describe('RpcExtApi', () => {
    let inst;
    let reqSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        inst = new RpcExtApiBridge_1.RpcExtApi(fake_1.fakeWebview);
        reqSpy = sandbox.spy(inst, 'request');
        sandbox.stub(rpc_extension_1.RpcExtension.prototype, 'invoke').returns(Promise.resolve());
    });
    afterEach(() => sandbox.restore());
    it('can send requests', () => Promise
        .all([
        inst.get('', undefined),
        inst.post('', undefined),
        inst.patch('', undefined),
        inst.delete('', undefined),
    ])
        .then(() => expect(reqSpy.callCount).toBe(4)));
    it('can dispatch', () => {
        const regMethodSpy = sandbox.stub(rpc_extension_1.RpcExtension.prototype, 'registerMethod');
        inst.dispatch({ startMsg: '', name: '', func: jest.fn() });
        expect(regMethodSpy.called).toBe(true);
    });
    it('can decorateWithMsg', () => {
        const regMethodSpy = sandbox.stub(rpc_extension_1.RpcExtension.prototype, 'registerMethod').callsFake((arg) => arg.func());
        inst.dispatch({ startMsg: '', name: '', func: jest.fn() });
        expect(regMethodSpy.called).toBe(true);
    });
    it('can decorateWithMsg with error', () => {
        const regMethodSpy = sandbox.stub(rpc_extension_1.RpcExtension.prototype, 'registerMethod').callsFake((arg) => arg.func());
        inst.dispatch({ startMsg: '', name: '', func: () => { throw ''; } });
        expect(regMethodSpy.called).toBe(true);
    });
});
//# sourceMappingURL=RpcExtApiBridge.spec.js.map