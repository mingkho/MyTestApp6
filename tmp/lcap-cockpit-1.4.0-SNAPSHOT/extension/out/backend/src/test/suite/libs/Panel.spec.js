"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const Panel_1 = require("../../../libs/Panel");
const vscode_1 = require("vscode");
const Panel = require("../../../libs/Panel");
const fs = require("fs");
const ProjectClient_1 = require("../../../libs/ProjectClient");
const fake_1 = require("../../../test/mocks/fake");
const mockVSCode_1 = require("../../../test/mocks/mockVSCode");
const Highlight_1 = require("../../../../../common/src/Highlight");
const CockpitApiImpl_1 = require("../../../libs/CockpitApi/CockpitApiImpl");
describe('Panel', () => {
    let cmdSpy;
    const sandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        cmdSpy = sandbox.spy(vscode_1.commands, 'executeCommand');
    });
    afterEach(() => sandbox.restore());
    describe('createPanel', () => {
        it('can create', () => {
            sandbox.stub(fs, 'readFileSync').returns('');
            return (0, Panel_1.createPanel)('/tmp').then(() => expect(cmdSpy.called).toBe(true));
        });
        it('can create if no panel', () => {
            (0, Panel_1.dispose)();
            sandbox.stub(fs, 'readFileSync').returns('');
            return (0, Panel_1.createPanel)('/tmp').then(() => expect(cmdSpy.called).toBe(true));
        });
        it('can handle error', () => (0, Panel_1.createPanel)('/tmp').then(() => expect(cmdSpy.called).toBe(true)));
        it('can dispatch changes', () => {
            sandbox.stub(ProjectClient_1.ProjectClient, 'projApi').value(Promise.resolve({ autoBuild: jest.fn() }));
            return (0, Panel_1.createPanel)('/tmp').then(() => expect(cmdSpy.called).toBe(true));
        });
    });
    describe('dispose', () => {
        it('can dispose', () => {
            (0, Panel_1.dispose)();
            expect(cmdSpy.called).toBe(true);
        });
        it('can dispose if no panel', () => {
            (0, Panel_1.dispose)();
            (0, Panel_1.dispose)();
            expect(cmdSpy.called).toBe(true);
        });
    });
    describe('handleViewStateChange', () => {
        it('can exec command', () => {
            (0, Panel_1.handleViewStateChange)({ webviewPanel: fake_1.fakeWebviewPanel });
            expect(cmdSpy.called).toBe(true);
        });
        it('can set view state', () => {
            const webviewPanel = { ...fake_1.fakeWebviewPanel, visible: false };
            (0, Panel_1.handleViewStateChange)({ webviewPanel });
            expect(cmdSpy.called).toBe(true);
        });
    });
    describe('getTargetCol', () => {
        expect((0, Panel_1.getTargetCol)()).toBe(mockVSCode_1.window.activeTextEditor.viewColumn);
        sandbox.stub(vscode_1.window, 'activeTextEditor').value(undefined);
        expect((0, Panel_1.getTargetCol)()).toBe(vscode_1.ViewColumn.One);
    });
    describe('getOrCreatePanel', () => {
        const createPanelSpy = sandbox.spy(Panel, 'createPanel');
        it('can create or return Panel', () => {
            return (0, Panel_1.getOrCreatePanel)('')
                .then(() => expect(createPanelSpy.called).toBe(true))
                .then(() => {
                createPanelSpy.resetHistory();
                return (0, Panel_1.getOrCreatePanel)('');
            })
                .then(() => expect(createPanelSpy.called).toBe(false));
        });
    });
    describe('loadFrontend', () => {
        it('can loadFrontend', () => {
            const readFileStub = sandbox.stub(fs, 'readFileSync').returns('');
            (0, Panel_1.dispose)();
            Panel.loadFrontend('');
            expect(readFileStub.called).toBe(true);
        });
    });
    describe('applyHighlight', () => {
        it('can applyHighlight', () => {
            let res = Panel.applyHighlight([]);
            sandbox.stub(CockpitApiImpl_1.cockpitData, 'current').value({
                DataModel: { entries: [{ ref: 'ns.name' }] }
            });
            expect(res.hasModItemEls).toBe(false);
            expect(res.hasProjEls).toBe(false);
            res = Panel.applyHighlight([
                {
                    level: Highlight_1.HighlightElementLevel.Project,
                    action: Highlight_1.ProjectAction.Preview,
                    effect: 'default',
                    comment: 'comment',
                    ref: 'project'
                },
                {
                    level: Highlight_1.HighlightElementLevel.Category,
                    action: Highlight_1.CategoryAction.Create,
                    effect: 'default',
                    comment: 'comment',
                    autoFocus: true,
                    ref: 'DataModel'
                },
                {
                    level: Highlight_1.HighlightElementLevel.Item,
                    action: Highlight_1.ItemAction.Edit,
                    effect: 'default',
                    comment: 'comment',
                    ref: 'ns.name'
                },
            ]);
            expect(res.hasModItemEls).toBe(true);
            expect(res.hasProjEls).toBe(true);
        });
    });
    it('can notifyHighlight', async () => {
        const postStub = sandbox.stub(Panel.webviewMeta.api, 'post');
        await Panel.notifyHighlight().then(() => expect(postStub.called).toBe(true));
        sandbox.stub(Panel.webviewMeta, 'api').value(undefined);
        await Panel.notifyHighlight().then(() => expect(postStub.called).toBe(true));
    });
    it('can flushHighlight on demand', () => {
        const getInfoStub = sandbox.stub(ProjectClient_1.ProjectClient, 'getProjInfo');
        const getListStub = sandbox.stub(ProjectClient_1.ProjectClient, 'getEntityList');
        Panel.flushHighlight(false, false);
        expect(getInfoStub.called).toBe(false);
        expect(getListStub.called).toBe(false);
        Panel.flushHighlight(true, true);
        expect(getInfoStub.called).toBe(true);
        expect(getListStub.called).toBe(true);
    });
    describe('getAndRevealPanelProvider', () => {
        it('can provide getAndRevealPanel', async () => {
            const applyStub = sandbox.stub(Panel, 'applyHighlight');
            sandbox.stub(Panel, 'getOrCreatePanel').returns(Promise.resolve(fake_1.fakeWebviewPanel));
            applyStub.returns({ hasModItemEls: false, hasProjEls: false });
            sandbox.stub(Panel, 'notifyHighlight').returns(Promise.resolve());
            const flushStub = sandbox.stub(Panel, 'flushHighlight');
            await Panel.getAndRevealPanelProvider({})({ col: 1, highlights: [] });
            expect(flushStub.called).toBe(false);
            applyStub.reset();
            applyStub.returns({ hasModItemEls: true, hasProjEls: true });
            await Panel.getAndRevealPanelProvider({})({ col: 1, highlights: [] });
            expect(flushStub.called).toBe(true);
            await Panel.getAndRevealPanelProvider({})({ highlights: [] });
            await Panel.getAndRevealPanelProvider({})();
        });
    });
    it('registerAndGetOpenHomeApi', () => {
        expect(Panel.registerAndGetOpenHomeApi({ subscriptions: [] })).toBeTruthy();
    });
});
//# sourceMappingURL=Panel.spec.js.map