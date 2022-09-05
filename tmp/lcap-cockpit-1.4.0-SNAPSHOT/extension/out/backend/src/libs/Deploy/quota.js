"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAvailableQuota = exports.getUsageInfo = exports.increaseUsageBy = exports.getCurrentPlan = exports.TenantPlans = exports.PlanLabels = exports.globalState = void 0;
exports.globalState = { current: undefined };
const KEYS = {
    USED_QUOTA: 'DeployCommand.usage',
    TENANT_PLAN: 'TENANT_PLAN'
};
var PlanLabels;
(function (PlanLabels) {
    PlanLabels["Free"] = "free";
    PlanLabels["StandardEdition"] = "standard-edition";
})(PlanLabels = exports.PlanLabels || (exports.PlanLabels = {}));
exports.TenantPlans = new Map([
    [PlanLabels.Free, { quota: 2, label: PlanLabels.Free }]
]);
const getCurrentPlan = () => process.env[KEYS.TENANT_PLAN] ||
    PlanLabels.StandardEdition;
exports.getCurrentPlan = getCurrentPlan;
/* istanbul ignore next */
const getUsedQuota = () => { var _a; return ((_a = exports.globalState.current) === null || _a === void 0 ? void 0 : _a.get(KEYS.USED_QUOTA)) || 0; };
const increaseUsageBy = (n) => {
    var _a;
    return (_a = exports.globalState.current) === null || _a === void 0 ? void 0 : _a.update(KEYS.USED_QUOTA, getUsedQuota() + n);
};
exports.increaseUsageBy = increaseUsageBy;
const getUsageInfo = () => {
    const plan = exports.TenantPlans.get((0, exports.getCurrentPlan)()) || { quota: Infinity, label: '' };
    const usedQuota = getUsedQuota();
    const totalQuota = plan.quota;
    const availableQuota = totalQuota - usedQuota;
    return { usedQuota, totalQuota, availableQuota, plan: plan.label };
};
exports.getUsageInfo = getUsageInfo;
const hasAvailableQuota = () => {
    const plan = exports.TenantPlans.get((0, exports.getCurrentPlan)());
    if (!plan) {
        return true;
    }
    return getUsedQuota() < plan.quota;
};
exports.hasAvailableQuota = hasAvailableQuota;
//# sourceMappingURL=quota.js.map