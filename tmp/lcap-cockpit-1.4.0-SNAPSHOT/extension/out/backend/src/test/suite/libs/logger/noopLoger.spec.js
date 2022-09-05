"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noopLogger_1 = require("../../../../libs/logger/noopLogger");
describe('NOOP_LOGGER', () => {
    it('returns itself', () => {
        expect(noopLogger_1.NOOP_LOGGER.getChildLogger(undefined)).toBe(noopLogger_1.NOOP_LOGGER);
    });
});
//# sourceMappingURL=noopLoger.spec.js.map