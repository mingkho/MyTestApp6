"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const noopLogger_1 = require("../../../../libs/logger/noopLogger");
const loggerImpl = require("../../../../libs/logger/loggerImpl");
const mockVSCode_1 = require("../../../../test/mocks/mockVSCode");
const fs_1 = require("fs");
const path = require("path");
const wrapper = require("../../../../test/mocks/mockVSCodeLoggingWrapper");
const Manifest_1 = require("../../../../libs/Manifest");
describe('loggerImpl', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    let wrapperStub;
    beforeEach(() => {
        wrapperStub = sandbox.stub(wrapper, 'configureLogger').value(undefined);
    });
    afterEach(() => sandbox.restore());
    describe('initLogger', () => {
        it('can init if no proper logger', () => {
            sandbox.stub(path, 'resolve').returns('');
            sandbox.stub(fs_1.promises, 'readFile').returns(Promise.resolve('{"contributes": {}}'));
            return loggerImpl.initLogger(mockVSCode_1.ExtensionContext)
                .then(() => expect(loggerImpl.getLogger()).toBe(noopLogger_1.NOOP_LOGGER));
        });
        it('can handle empty meta', () => {
            sandbox.stub(JSON, 'parse')
                .returns(Promise.resolve(undefined));
            return loggerImpl.initLogger(mockVSCode_1.ExtensionContext)
                .then(() => expect(loggerImpl.getLogger()).toBe(noopLogger_1.NOOP_LOGGER));
        });
        it('can handle empty contributes', () => {
            sandbox.stub(fs_1.promises, 'readFile')
                .returns(Promise.resolve(`{}`));
            return loggerImpl.initLogger(mockVSCode_1.ExtensionContext)
                .then(() => expect(loggerImpl.getLogger()).toBe(noopLogger_1.NOOP_LOGGER));
        });
        it('can handle empty configuration', () => {
            sandbox.stub(fs_1.promises, 'readFile')
                .returns(Promise.resolve(`
          {"contributes": {}}
      `));
            return loggerImpl.initLogger(mockVSCode_1.ExtensionContext)
                .then(() => expect(loggerImpl.getLogger()).toBe(noopLogger_1.NOOP_LOGGER));
        });
        it('can continue if there are configs', () => {
            sandbox.stub(Manifest_1.homePkgJson, 'current')
                .value(Promise.resolve({
                "contributes": {
                    "configuration": {
                        "properties": {
                            "lcap.homeLogging.loggingLevel": {},
                            "lcap.homeLogging.srcLocTracking": {}
                        }
                    }
                }
            }));
            return loggerImpl.initLogger(mockVSCode_1.ExtensionContext)
                .then(() => expect(loggerImpl.getLogger() !== noopLogger_1.NOOP_LOGGER).toBe(true))
                .then(() => {
                return loggerImpl.initLogger(mockVSCode_1.ExtensionContext);
            });
        });
    });
});
//# sourceMappingURL=loggerImpl.spec.js.map