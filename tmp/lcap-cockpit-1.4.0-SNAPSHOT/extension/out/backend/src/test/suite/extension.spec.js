"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const loggerImpl = require("../../libs/logger/loggerImpl");
const Panel = require("../../libs/Panel");
const extension_1 = require("../../extension");
const mockVSCode_1 = require("../mocks/mockVSCode");
const vscode_1 = require("vscode");
const states = require("../../tasks/states");
const Workspace = require("../../libs/Workspace");
const fake_1 = require("../mocks/fake");
const UsageAnalytics = require("../../libs/UsageAnalytics");
const noopLogger_1 = require("../../libs/logger/noopLogger");
describe('extension', () => {
    let sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        sandbox.stub(UsageAnalytics, 'initTracker').returns(Promise.resolve(undefined));
        sandbox.stub(UsageAnalytics, 'trackUsage');
        sandbox.stub(loggerImpl, 'getLogger').returns(noopLogger_1.NOOP_LOGGER);
        sandbox.stub(Workspace, 'noWorkspace').returns(false);
        sandbox.stub(Workspace, 'rootFolder').returns(fake_1.fakeWorkspaceFolder);
    });
    afterEach(() => sandbox.restore());
    describe('activate', () => {
        it('can activate', () => {
            const spies = [
                sandbox.spy(loggerImpl, 'initLogger'),
            ];
            (0, extension_1.activate)(mockVSCode_1.ExtensionContext);
            expect(spies.every(spy => spy.called)).toBe(true);
        });
        it('can continue if hasCustomExecution', () => {
            sandbox.stub(states, 'refreshAllStates').returns(undefined);
            const taskSpy = sandbox.spy(vscode_1.tasks, 'registerTaskProvider');
            (0, extension_1.activate)(mockVSCode_1.ExtensionContext);
            expect(taskSpy.called).toBe(true);
        });
        it('can getOrCreatePanel', () => {
            sandbox.stub(states, 'refreshAllStates').returns(undefined);
            sandbox.stub(loggerImpl, 'initLogger').returns(Promise.resolve());
            const panelSpy = sandbox.spy(Panel, 'getOrCreatePanel');
            const fns = (0, extension_1.activate)(mockVSCode_1.ExtensionContext);
            fns.getAndRevealPanel();
            fns.openStoryboard();
            return Promise.resolve()
                .then(() => new Promise(res => {
                setTimeout(() => res(panelSpy.called), 0);
            }))
                .then(res => expect(res).toBe(true));
        });
    });
});
//# sourceMappingURL=extension.spec.js.map