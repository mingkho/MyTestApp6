"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const quota = require("../../../../libs/Deploy/quota");
describe('deploy quota', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    afterEach(() => sandbox.restore());
    it('can getUsageInfo', () => {
        sandbox.stub(quota, 'getCurrentPlan').returns(quota.PlanLabels.Free);
        const info = quota.getUsageInfo();
        const freeQuota = quota.TenantPlans.get(quota.PlanLabels.Free).quota;
        expect(info.availableQuota).toBe(freeQuota - 0);
        expect(info.totalQuota).toBe(freeQuota);
        expect(info.usedQuota).toBe(0);
    });
    it('can detect available quota', () => {
        sandbox.stub(quota, 'getCurrentPlan').returns(quota.PlanLabels.Free);
        const res = quota.hasAvailableQuota();
        expect(res).toBe(true);
    });
});
//# sourceMappingURL=quota.spec.js.map