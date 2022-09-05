"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const GraphWalker = require("../../../../libs/DependencyResolver/GraphWalker");
const DependencyResolver = require("../../../../libs/DependencyResolver");
const project_1 = require("project");
const fs_1 = require("fs");
const path_1 = require("path");
const ChildProcess = require("../../../../libs/ChildProcess/ChildProcess");
const vscode_1 = require("vscode");
describe('DependencyResolver', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can getAllDependenciesOf', () => {
        const directSpy = sandbox.spy(DependencyResolver, 'getDirectDependenciesOf');
        DependencyResolver.getAllDependenciesOf({ ref: 'test' });
        expect(directSpy.called).toBe(true);
    });
    it('can refreshItemDependencyMap', async () => {
        const generateSpy = sandbox.stub(GraphWalker, 'generateGraphFrom');
        await DependencyResolver.refreshItemDependencyMap([], '');
        expect(generateSpy.called).toBe(true);
    });
    it('can fill Workflow Model to Mdk App Links', () => {
        var _a;
        const items = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'workflowItems.json'), 'utf-8'));
        DependencyResolver.fillWorkflowModel2MdkAppLinks(items);
        const mdkApp = items.find(i => i.name === 'MDKLCAPOnboardExTaskUI');
        expect(mdkApp.links.some(link => link.type === project_1.ItemType.Workflow && link.linkType === project_1.LinkType.HAS_DEPENDENCY)).toBe(true);
        mdkApp === null || mdkApp === void 0 ? true : delete mdkApp.links;
        DependencyResolver.fillWorkflowModel2MdkAppLinks(items);
        expect(mdkApp.links.some(link => link.type === project_1.ItemType.Workflow && link.linkType === project_1.LinkType.HAS_DEPENDENCY)).toBe(true);
        mdkApp === null || mdkApp === void 0 ? true : delete mdkApp.links;
        const pathStub = sandbox.stub(mdkApp, 'path').value('fakePath');
        DependencyResolver.fillWorkflowModel2MdkAppLinks(items);
        expect(mdkApp.links).toBeFalsy();
        pathStub.restore();
        (_a = items.find(i => i.type === project_1.ItemType.MDKTaskUI)) === null || _a === void 0 ? true : delete _a.links;
        DependencyResolver.fillWorkflowModel2MdkAppLinks(items);
        expect((mdkApp === null || mdkApp === void 0 ? void 0 : mdkApp.links).length).toBeFalsy();
    });
    it('can fill Mdk App to Service Entity Links', async () => {
        var _a, _b;
        const items = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'genericItems.json'), 'utf-8'));
        const res = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'MdkCheckBackendRes.json'), 'utf-8');
        sandbox.stub(ChildProcess, 'exec').returns(Promise.resolve(res));
        const mdkApp = items.find(i => i.name === 'risks-mdk');
        expect((_a = mdkApp === null || mdkApp === void 0 ? void 0 : mdkApp.links) === null || _a === void 0 ? void 0 : _a.every(link => link.type !== project_1.ItemType.ODataV4ServiceEntity)).toBe(true);
        await DependencyResolver.fillMdkApp2SvcEntLinks(items, '');
        expect((_b = mdkApp === null || mdkApp === void 0 ? void 0 : mdkApp.links) === null || _b === void 0 ? void 0 : _b.some(link => link.type === project_1.ItemType.ODataV4ServiceEntity)).toBe(true);
        items.find(i => i.type === project_1.ItemType.ODataV4ServiceEntity && i.name === 'Risks').name = 'fakeName';
        mdkApp === null || mdkApp === void 0 ? true : delete mdkApp.links;
        await DependencyResolver.fillMdkApp2SvcEntLinks(items, '');
        expect(mdkApp === null || mdkApp === void 0 ? void 0 : mdkApp.links).toBeFalsy();
    });
    it('can fill FioriELements App to Service Entity Links', async () => {
        var _a, _b;
        const items = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'genericItems.json'), 'utf-8'));
        const res = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'FindUsedEntitiesRes.json'), 'utf-8'));
        sandbox.stub(vscode_1.commands, 'executeCommand').returns(Promise.resolve(res));
        const feApp = items.find(i => i.ref === 'ns.risks');
        expect((_a = feApp === null || feApp === void 0 ? void 0 : feApp.links) === null || _a === void 0 ? void 0 : _a.every(link => link.type !== project_1.ItemType.ODataV4ServiceEntity)).toBe(true);
        await DependencyResolver.fillFeApp2SvcEntLinks(items, '');
        expect((_b = feApp === null || feApp === void 0 ? void 0 : feApp.links) === null || _b === void 0 ? void 0 : _b.some(link => link.type === project_1.ItemType.ODataV4ServiceEntity)).toBe(true);
        items.find(i => i.type === project_1.ItemType.ODataV4ServiceEntity && i.name === 'Risks').name = 'fakeName';
        feApp === null || feApp === void 0 ? true : delete feApp.links;
        await DependencyResolver.fillFeApp2SvcEntLinks(items, '');
        expect(feApp === null || feApp === void 0 ? void 0 : feApp.links).toBeFalsy();
    });
});
//# sourceMappingURL=index.spec.js.map