"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testRunTask = require("../../../../tasks/testRunTask");
const sinon_1 = require("sinon");
const Workspace = require("../../../../libs/Workspace");
const fake_1 = require("../../../mocks/fake");
const LcapTestRun_1 = require("../../../../libs/TestRun/LcapTestRun");
const init_1 = require("../../../../libs/TestRun/init");
const WithRemoteConfig_1 = require("../../../../libs/TestRun/PreviewConfig/WithRemoteConfig");
const ProjectClient_1 = require("../../../../libs/ProjectClient");
const Task_1 = require("../../../../../../common/src/Task");
describe('runProj', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    const getProjCdsRequiresEnv = sandbox.stub(ProjectClient_1.ProjectClient, 'getProjCdsRequiresEnv');
    it('can run', async () => {
        const getTaskSpy = sandbox.spy(testRunTask, 'getTestRunTask');
        sandbox.stub(Workspace, 'noWorkspace').returns(false);
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
        getProjCdsRequiresEnv.returns(Promise.resolve({}));
        await (0, init_1.runProj)();
        expect(getTaskSpy.called).toBe(true);
    });
    it('can run in remote mode', async () => {
        const setTestRunTaskEnvSpy = sandbox.spy(testRunTask, 'setTestRunTaskEnv');
        getProjCdsRequiresEnv.returns(Promise.resolve({
            test: {
                kind: 'odata',
                "[production]": {
                    credentials: {
                        destination: "test"
                    }
                }
            }
        }));
        await (0, init_1.runProj)(Task_1.PreviewModes.WithRemote);
        expect(setTestRunTaskEnvSpy.called).toBe(true);
    });
    it('can fetch latest remmote dest', async () => {
        const cdsReq = {
            test: {
                kind: 'odata',
                credentials: {
                    destination: "test"
                }
            }
        };
        const res = await (0, WithRemoteConfig_1.getDestProxiesFrom)(cdsReq);
        expect(res).toHaveLength(1);
    });
    it('can set remote dest env', async () => {
        (0, init_1.setRemoteRunEnv)("mockRemoteEnv");
        expect(testRunTask.testRunTaskEnv).toBeTruthy;
    });
    it('can handle error', async () => {
        sandbox.stub(LcapTestRun_1.LcapTestRun.prototype, 'run').returns(Promise.reject('err'));
        return (0, init_1.runProj)().catch(err => expect(err).toBeTruthy);
    });
});
//# sourceMappingURL=init.spec.js.map