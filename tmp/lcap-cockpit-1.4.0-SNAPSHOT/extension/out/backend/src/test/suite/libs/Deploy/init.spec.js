"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const CloudFoundry = require("../../../../libs/CloudFoundry");
const init_1 = require("../../../../libs/Deploy/init");
const LcapDeploy_1 = require("../../../../libs/Deploy/LcapDeploy");
describe('deployProj', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    const hasLoggedInStub = sandbox.stub(CloudFoundry, 'hasLoggedIn').returns(Promise.resolve(true));
    sandbox.stub(CloudFoundry, 'login').returns(Promise.resolve());
    const deployStub = sandbox.stub(LcapDeploy_1.LcapDeploy.prototype, 'deploy').returns(Promise.resolve());
    it('can deploy', async () => {
        await (0, init_1.deployProj)();
        expect(deployStub.called).toBe(true);
        deployStub.reset();
        hasLoggedInStub.reset();
        hasLoggedInStub.returns(Promise.resolve(false));
        await (0, init_1.deployProj)();
        expect(deployStub.called).toBe(false);
    });
    it('can handle error', async () => {
        hasLoggedInStub.returns(Promise.reject('err'));
        return (0, init_1.deployProj)().catch(err => expect(err).toBeTruthy);
    });
});
//# sourceMappingURL=init.spec.js.map