"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("project");
const sinon_1 = require("sinon");
const DeployState_1 = require("../../../../../../common/src/Deploy/DeployState");
const info_1 = require("../../../../libs/Deploy/info");
describe('info', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can getLatestDeployInfo', async () => {
        const fakeApi = { getApplicationDeploymentSummary: jest.fn(), fs: () => ({ rootPath: '/tmp' }) };
        const getUrlStub = sandbox.stub(project_1.ProjectImpl.prototype, 'getApplicationDeploymentSummary')
            .returns(Promise.resolve(undefined));
        let res = await (0, info_1.getLatestDeployInfo)(fakeApi);
        expect(getUrlStub.called).toBe(true);
        expect(res.state).toBe(DeployState_1.DeployState.NoOverviewPageUrl);
        try {
            await (0, info_1.getLatestDeployInfo)();
        }
        catch (err) {
            expect(err).toBeTruthy();
        }
        getUrlStub.reset();
        getUrlStub.returns(Promise.resolve({
            ProjectOverviewURL: 'www.sap.com', DeployedUTCTime: (new Date()).toUTCString()
        }));
        res = await (0, info_1.getLatestDeployInfo)(fakeApi);
        expect(res.state).toBe(DeployState_1.DeployState.HasOverviewPageUrl);
    });
});
//# sourceMappingURL=info.spec.js.map