"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const Util_1 = require("../../../libs/Util");
describe('debounce', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    const logger = { log: () => console.log('tmp') };
    let loggerSpy;
    beforeEach(() => loggerSpy = sandbox.stub(logger, 'log'));
    afterEach(() => sandbox.restore());
    it('can execute with normal function input', () => {
        return (0, Util_1.debounce)(logger.log)().then(() => expect(loggerSpy.called).toBe(true));
    });
    it('can delay the execution', () => {
        const dbFn = (0, Util_1.debounce)(logger.log);
        dbFn();
        return dbFn().then(() => expect(loggerSpy.called).toBe(true));
    });
});
//# sourceMappingURL=Util.spec.js.map