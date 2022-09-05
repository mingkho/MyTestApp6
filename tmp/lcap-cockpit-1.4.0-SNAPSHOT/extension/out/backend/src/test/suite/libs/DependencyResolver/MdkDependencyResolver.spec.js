"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MdkDependencyResolver_1 = require("../../../../libs/DependencyResolver/MdkDependencyResolver");
const sinon_1 = require("sinon");
const ChildProcess = require("../../../../libs/ChildProcess/ChildProcess");
const fs_1 = require("fs");
const path_1 = require("path");
describe('MdkDependencyResolver', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => sandbox.restore());
    it('can parse normal results', async () => {
        const res = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'MdkCheckBackendRes.json'), 'utf-8');
        sandbox.stub(ChildProcess, 'exec').returns(Promise.resolve(res));
        const deps = await (0, MdkDependencyResolver_1.parseBackendFor)('');
        expect(deps).toHaveLength(1);
        expect(deps[0].entityName).toBe('Risks');
        expect(deps[0].serviceName).toBe('RiskService');
        expect(deps[0].mdkApp).toBe('risks-mdk');
    });
    it('can prevent error results', async () => {
        sandbox.stub(ChildProcess, 'exec').returns(Promise.resolve('unparsable'));
        const deps = await (0, MdkDependencyResolver_1.parseBackendFor)('');
        expect(deps).toHaveLength(0);
    });
    it('can handle error msg', async () => {
        sandbox.stub(ChildProcess, 'exec').returns(Promise.reject('err msg'));
        const deps = await (0, MdkDependencyResolver_1.parseBackendFor)('');
        expect(deps).toHaveLength(0);
    });
});
//# sourceMappingURL=MdkDependencyResolver.spec.js.map