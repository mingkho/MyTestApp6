"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsageAnalytics_1 = require("../../../../libs/UsageAnalytics");
const objects_1 = require("../../../../libs/UsageAnalytics/objects");
const FakeTracker_1 = require("../../../../libs/UsageAnalytics/FakeTracker");
const SwaTracker = require("../../../../libs/UsageAnalytics/SwaTracker");
const sinon_1 = require("sinon");
describe('UsageAnalytics', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can init different type of trackers', async () => {
        const initStub = sandbox.stub(SwaTracker, 'initSwaTracker');
        await (0, UsageAnalytics_1.initTracker)(objects_1.TrackerTypes.SWA);
        expect(initStub.called).toBe(true);
        await (0, UsageAnalytics_1.initTracker)('fake');
        let t = await (0, UsageAnalytics_1.getTracker)();
        expect(t).toBe(FakeTracker_1.fakeTracker);
        initStub.reset();
        await (0, UsageAnalytics_1.initTracker)();
        expect(initStub.called).toBe(true);
    });
});
//# sourceMappingURL=index.spec.js.map