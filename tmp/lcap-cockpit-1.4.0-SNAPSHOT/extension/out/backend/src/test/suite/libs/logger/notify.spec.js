"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const noopLogger_1 = require("../../../../libs/logger/noopLogger");
const loggerImpl = require("../../../../libs/logger/loggerImpl");
const notify_1 = require("../../../../libs/logger/notify");
describe('notifyUtil', () => {
    let loggerSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        loggerSpy = sandbox.stub(loggerImpl, 'getLogger').returns(noopLogger_1.NOOP_LOGGER);
    });
    afterEach(() => sandbox.restore());
    describe('notify', () => {
        it('can notify', () => {
            (0, notify_1.notify)('msg', notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.DebugLog, notify_1.NotifyDest.InfoLog, notify_1.NotifyDest.ErrMsgBox);
            expect(loggerSpy.calledThrice).toBe(true);
        });
        it('can exit if no dest', () => {
            (0, notify_1.notify)('msg', 'tmp');
            expect(loggerSpy.called).toBe(false);
        });
    });
    describe('normalize', () => {
        it('can detect empty values', () => {
            const inputs = ['', undefined, null, 0, false];
            expect(inputs.every(input => (0, notify_1.normalize)(input).includes('empty error')));
        });
        it('can handle buffer', () => {
            const testStr = 'test';
            expect((0, notify_1.normalize)(Buffer.from(testStr))).toBe(testStr);
        });
        it('can handle obj', () => {
            expect((0, notify_1.normalize)({ testKey: 1 }).includes('testKey')).toBe(true);
        });
        it('can handle empty obj', () => {
            expect((0, notify_1.normalize)({})).toBe('');
        });
        it('can handle special obj', () => {
            expect((0, notify_1.normalize)({ toString: () => '' })).toBe('');
        });
        it('can handle special obj', () => {
            expect((0, notify_1.normalize)({ toString: () => '' })).toBe('');
        });
        it('can handle error in stringify', () => {
            sandbox.stub(JSON, 'stringify').throws();
            expect((0, notify_1.normalize)({})).toBe('');
        });
    });
});
//# sourceMappingURL=notify.spec.js.map