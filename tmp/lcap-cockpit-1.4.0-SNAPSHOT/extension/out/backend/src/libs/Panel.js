"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAndGetOpenHomeApi = exports.getAndRevealPanelProvider = exports.flushHighlight = exports.notifyHighlight = exports.applyHighlight = exports.getOrCreatePanel = exports.createPanel = exports.handleViewStateChange = exports.getTargetCol = exports.dispose = exports.loadFrontend = exports.webviewMeta = void 0;
const path_1 = require("path");
const vscode_1 = require("vscode");
const RpcExtApiBridge_1 = require("./RpcExtApiBridge");
const fs_1 = require("fs");
const notify_1 = require("./logger/notify");
const apiEndpoints_1 = require("./apiEndpoints");
const CockpitApiImpl_1 = require("./CockpitApi/CockpitApiImpl");
const ProjectClient_1 = require("./ProjectClient");
const Highlight_1 = require("../../../common/src/Highlight");
const RpcApi_1 = require("../../../common/src/RpcApi");
const UsageAnalytics_1 = require("./UsageAnalytics");
const objects_1 = require("./UsageAnalytics/objects");
const LifeCycleClient_1 = require("./ShareClient/LifeCycleClient");
const WEB_BUILD_PATHS = ['out', 'frontend'];
const VIEW_TYPE = 'LcapHomepage';
exports.webviewMeta = {};
const loadFrontend = (extPath) => {
    var _a;
    try {
        const htmlTmpl = (0, fs_1.readFileSync)((0, path_1.join)(extPath, ...WEB_BUILD_PATHS, 'index.html'), { encoding: 'utf-8' });
        const distUri = vscode_1.Uri.file((0, path_1.join)(extPath, ...WEB_BUILD_PATHS));
        const baseUri = (_a = exports.webviewMeta.panel) === null || _a === void 0 ? void 0 : _a.webview.asWebviewUri(distUri);
        return htmlTmpl.replace('<base href="/">', `<base href="${String(baseUri)}/">`);
    }
    catch (err) {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
        return '';
    }
};
exports.loadFrontend = loadFrontend;
const dispose = () => {
    var _a;
    (_a = exports.webviewMeta.panel) === null || _a === void 0 ? void 0 : _a.dispose();
    exports.webviewMeta.panel = undefined;
    vscode_1.commands.executeCommand('setContext', 'homepageIsVisible', 0);
};
exports.dispose = dispose;
const getTargetCol = () => { var _a; return ((_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.viewColumn) || vscode_1.ViewColumn.One; };
exports.getTargetCol = getTargetCol;
const WEBVIEW_TITLE = 'Home';
const getIconUri = (extPath) => ({
    light: vscode_1.Uri.file((0, path_1.join)(extPath, 'media', 'homepage-btn-light.svg')),
    dark: vscode_1.Uri.file((0, path_1.join)(extPath, 'media', 'homepage-btn-dark.svg'))
});
const handleViewStateChange = ({ webviewPanel }) => vscode_1.commands.executeCommand('setContext', 'homepageIsVisible', webviewPanel.visible ? 1 : 0);
exports.handleViewStateChange = handleViewStateChange;
const createPanel = (extPath, col) => Promise.resolve()
    .then(() => {
    exports.webviewMeta.panel = vscode_1.window.createWebviewPanel(VIEW_TYPE, WEBVIEW_TITLE, { viewColumn: col !== null && col !== void 0 ? col : (0, exports.getTargetCol)() }, {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode_1.Uri.file((0, path_1.join)(extPath, ...WEB_BUILD_PATHS))]
    });
    exports.webviewMeta.api = new RpcExtApiBridge_1.RpcExtApi(exports.webviewMeta.panel.webview);
    exports.webviewMeta.panel.webview.html = (0, exports.loadFrontend)(extPath);
    exports.webviewMeta.panel.iconPath = getIconUri(extPath);
    (0, CockpitApiImpl_1.dispatchWorkspaceChanges)(exports.webviewMeta.api);
    (0, apiEndpoints_1.dispatchAllEndpoints)(exports.webviewMeta.api);
    (0, CockpitApiImpl_1.dispatchTaskStateHook)(exports.webviewMeta.api);
    (0, LifeCycleClient_1.dispatchLifecycleHook)(exports.webviewMeta.api);
    ProjectClient_1.ProjectClient.projApi.then(projApi => {
        if (projApi) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (0, CockpitApiImpl_1.dispatchFileChanges)(exports.webviewMeta.api);
            ProjectClient_1.ProjectClient.initAutoBuild(projApi);
        }
    }).catch(err => (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog, notify_1.NotifyDest.ErrMsgBox));
    exports.webviewMeta.panel.onDidDispose(exports.dispose, undefined);
    exports.webviewMeta.panel.onDidChangeViewState(exports.handleViewStateChange);
    vscode_1.commands.executeCommand('setContext', 'homepageIsVisible', 1);
    return exports.webviewMeta.panel;
});
exports.createPanel = createPanel;
const getOrCreatePanel = (extPath, col) => {
    return exports.webviewMeta.panel ? Promise.resolve(exports.webviewMeta.panel) : (0, exports.createPanel)(extPath, col);
};
exports.getOrCreatePanel = getOrCreatePanel;
const OPEN_HOME_CMD = 'lcap.home.openCockpit';
const getRefSets = (highlights) => {
    const itemRefSet = new Set();
    const cateRefSet = new Set();
    const projRefSet = new Set();
    highlights.forEach(conf => {
        switch (conf.level) {
            case Highlight_1.HighlightElementLevel.Item:
                itemRefSet.add(conf.ref);
                break;
            case Highlight_1.HighlightElementLevel.Category:
                cateRefSet.add(conf.ref);
                break;
            case Highlight_1.HighlightElementLevel.Project:
                projRefSet.add(conf.ref);
                break;
        }
    });
    return { itemRefSet, cateRefSet, projRefSet };
};
const applyHighlight = (highlights) => {
    if (!highlights.length) {
        return { hasModItemEls: false, hasProjEls: false };
    }
    const { itemRefSet, cateRefSet, projRefSet } = getRefSets(highlights);
    const hasProjEls = projRefSet.size !== 0;
    const refHighlightMap = highlights.reduce((m, h) => m.set(h.ref, h), new Map());
    const highlightedItems = Object.keys(CockpitApiImpl_1.cockpitData.current)
        .map(cate => CockpitApiImpl_1.cockpitData.current[cate].entries)
        .flat()
        .filter(ent => itemRefSet.has(ent.ref))
        .map(ent => {
        ent.highlight = refHighlightMap.get(ent.ref);
        return ent;
    });
    const highlightedCategories = Object.keys(CockpitApiImpl_1.cockpitData.current)
        .filter(cateName => cateRefSet.has(cateName))
        .map(cateName => {
        CockpitApiImpl_1.cockpitData.current[cateName].highlight = refHighlightMap.get(cateName);
        return CockpitApiImpl_1.cockpitData.current[cateName];
    });
    const hasModItemEls = highlightedItems.length + highlightedCategories.length > 0;
    if (hasProjEls) {
        CockpitApiImpl_1.projectStatus.current.highlight = refHighlightMap.get('project');
    }
    return { hasModItemEls, hasProjEls };
};
exports.applyHighlight = applyHighlight;
const notifyHighlight = () => {
    var _a, _b;
    return Promise.all([
        (_a = exports.webviewMeta.api) === null || _a === void 0 ? void 0 : _a.post(RpcApi_1.UIEndPoint.notifyProjInfo, [CockpitApiImpl_1.projectStatus.current]),
        (_b = exports.webviewMeta.api) === null || _b === void 0 ? void 0 : _b.post(RpcApi_1.UIEndPoint.notifyAllItems, [CockpitApiImpl_1.cockpitData.current])
    ]);
};
exports.notifyHighlight = notifyHighlight;
const flushHighlight = (hasModItemEls, hasProjEls) => {
    if (hasProjEls) {
        ProjectClient_1.ProjectClient.getProjInfo(true);
    }
    if (hasModItemEls) {
        ProjectClient_1.ProjectClient.getEntityList(true);
    }
};
exports.flushHighlight = flushHighlight;
const getAndRevealPanelProvider = (ctx) => ({ col, highlights } = { highlights: [] }) => (0, exports.getOrCreatePanel)(ctx.extensionPath, col)
    .then(panel => {
    (0, UsageAnalytics_1.trackUsage)(objects_1.HomeEvents.ShowHomePanel);
    return col !== undefined && panel.viewColumn !== col
        ? (panel.dispose(), (0, exports.getOrCreatePanel)(ctx.extensionPath, col))
        : Promise.resolve((panel.reveal(col), panel));
})
    .then(() => (0, exports.notifyHighlight)())
    .then(() => {
    const { hasModItemEls, hasProjEls } = (0, exports.applyHighlight)(highlights);
    if (!hasModItemEls && !hasProjEls) {
        return;
    }
    return (0, exports.notifyHighlight)().finally(() => (0, exports.flushHighlight)(hasModItemEls, hasProjEls));
});
exports.getAndRevealPanelProvider = getAndRevealPanelProvider;
const registerAndGetOpenHomeApi = (ctx) => {
    const getAndRevealPanel = (0, exports.getAndRevealPanelProvider)(ctx);
    ctx.subscriptions.push(vscode_1.commands.registerCommand(OPEN_HOME_CMD, getAndRevealPanel));
    return getAndRevealPanel;
};
exports.registerAndGetOpenHomeApi = registerAndGetOpenHomeApi;
//# sourceMappingURL=Panel.js.map