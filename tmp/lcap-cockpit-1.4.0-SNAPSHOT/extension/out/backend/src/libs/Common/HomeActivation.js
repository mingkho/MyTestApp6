"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseActivationCountBy = exports.getActivationCount = void 0;
const HOME_STATE_KEYS = {
    ACT_COUNT: 'lcap.home.activation_count',
};
const getActivationCount = (ctx) => ctx.workspaceState.get(HOME_STATE_KEYS.ACT_COUNT) || 0;
exports.getActivationCount = getActivationCount;
const increaseActivationCountBy = (ctx, amount = 1) => {
    const oldCount = (0, exports.getActivationCount)(ctx);
    return Promise.resolve(ctx.workspaceState.update(HOME_STATE_KEYS.ACT_COUNT, oldCount + amount));
};
exports.increaseActivationCountBy = increaseActivationCountBy;
//# sourceMappingURL=HomeActivation.js.map