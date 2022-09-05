"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOOP_LOGGER = void 0;
const noop = () => undefined;
exports.NOOP_LOGGER = {
    changeLevel: noop,
    changeSourceLocationTracking: noop,
    debug: noop,
    error: noop,
    fatal: noop,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    getChildLogger(..._rest) { return this; },
    info: noop,
    trace: noop,
    warn: noop
};
//# sourceMappingURL=noopLogger.js.map