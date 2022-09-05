"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const GuidedDevInvoker = require("../../../../libs/GuidedDevelopment/GuidedDevInvoker");
const GuidedDevelopment_1 = require("../../../../libs/GuidedDevelopment");
const HomeActivation = require("../../../../libs/Common/HomeActivation");
const ProjectClient_1 = require("../../../../libs/ProjectClient");
describe('GuidedDevInvoker', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can invokeGuidedDev', async () => {
        const actStub = sandbox.stub(HomeActivation, 'getActivationCount');
        const hasProjStub = sandbox.stub(ProjectClient_1.ProjectClient, 'hasProj');
        const invokeStub = sandbox.stub(GuidedDevInvoker, 'invokeGuidedDev');
        hasProjStub.value(Promise.resolve(false));
        await (0, GuidedDevelopment_1.invokeGuidedDevOnDemand)({}).then(() => expect(actStub.called).toBe(false));
        hasProjStub.value(Promise.resolve(true));
        actStub.returns(1);
        await (0, GuidedDevelopment_1.invokeGuidedDevOnDemand)({}).then(() => expect(invokeStub.called).toBe(true));
    });
});
//# sourceMappingURL=index.spec.js.map