"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swa = require("@sap/swa-for-sapbas-vsx");
const sinon_1 = require("sinon");
const Manifest_1 = require("../../../../..//libs/Manifest");
const SwaTracker_1 = require("../../../../../libs/UsageAnalytics/SwaTracker");
describe('SwaTracker Index', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can init tracker', async () => {
        const metaStub = sandbox.stub(Manifest_1.homePkgJson, 'current').value(Promise.resolve(undefined));
        let res = await (0, SwaTracker_1.initSwaTracker)();
        expect(res).toBeFalsy();
        metaStub.reset();
        sandbox.stub(swa, 'SWATracker').callsFake((pub, name, onErr) => onErr());
        metaStub.value(Promise.resolve({}));
        res = await (0, SwaTracker_1.initSwaTracker)();
        expect(res).toBeTruthy();
    });
});
//# sourceMappingURL=index.spec.js.map