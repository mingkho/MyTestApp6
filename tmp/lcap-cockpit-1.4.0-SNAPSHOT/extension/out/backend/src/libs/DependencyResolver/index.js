"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectDependenciesOf = exports.getAllDependenciesOf = exports.getAdjListOf = exports.fillFeApp2SvcEntLinks = exports.fillMdkApp2SvcEntLinks = exports.fillWorkflowModel2MdkAppLinks = exports.refreshItemDependencyMap = void 0;
const project_1 = require("project");
const GraphWalker_1 = require("./GraphWalker");
const ItemType_1 = require("../../../../common/artifact-management/definitions/ItemType");
const MdkDependencyResolver_1 = require("./MdkDependencyResolver");
const path_1 = require("path");
const FioriElmsDependencyResolver_1 = require("./FioriElmsDependencyResolver");
let dependencyMap = new Map();
const refreshItemDependencyMap = (items, basePath) => Promise
    .all([
    (0, exports.fillFeApp2SvcEntLinks)(items, basePath),
    (0, exports.fillMdkApp2SvcEntLinks)(items, basePath)
])
    .then(() => {
    (0, exports.fillWorkflowModel2MdkAppLinks)(items);
    return dependencyMap = (0, GraphWalker_1.generateGraphFrom)(items);
});
exports.refreshItemDependencyMap = refreshItemDependencyMap;
const fillWorkflowModel2MdkAppLinks = (items) => {
    const taskUis = items.filter(i => i.type === ItemType_1.ItemType.MDKTaskUI);
    const mdkApps = items.filter(i => i.type === ItemType_1.ItemType.MDKApplication);
    taskUis.forEach(taskUi => {
        const appPrefix = taskUi.ref.replace(/\.project.json$/, '');
        const sameApp = mdkApps.find(mdkApp => mdkApp.path.startsWith(appPrefix));
        if (!sameApp) {
            return;
        }
        sameApp.links = [...sameApp.links || []];
        sameApp.links.push(...(taskUi.links || []));
    });
};
exports.fillWorkflowModel2MdkAppLinks = fillWorkflowModel2MdkAppLinks;
const fillMdkApp2SvcEntLinks = (items, basePath) => {
    const mdkApps = items.filter(i => i.type === ItemType_1.ItemType.MDKApplication);
    const svcs = items.filter(i => i.type === ItemType_1.ItemType.CAPService);
    const svcEnts = items.filter(i => i.type === ItemType_1.ItemType.ODataV4ServiceEntity);
    return Promise
        .all(mdkApps.map(mdkApp => {
        const appFolder = (0, path_1.join)(basePath, mdkApp.path.replace(/Application\.app$/, ''));
        return (0, MdkDependencyResolver_1.parseBackendFor)(appFolder);
    }))
        .then(depsList => {
        depsList.forEach((deps, idx) => {
            const mdkApp = mdkApps[idx];
            deps.forEach(dep => {
                const svc = svcs.find(svc => svc.name === dep.serviceName);
                const svcEnt = svcEnts.find(svcEnt => {
                    var _a;
                    return svcEnt.name === dep.entityName &&
                        ((_a = svcEnt.links) === null || _a === void 0 ? void 0 : _a.some(link => link.ref === (svc === null || svc === void 0 ? void 0 : svc.ref)));
                });
                if (!svcEnt) {
                    return;
                }
                mdkApp.links = [...mdkApp.links || []];
                mdkApp.links.push({ linkType: project_1.LinkType.DEPENDS_ON, type: svcEnt.type, ref: svcEnt.ref });
            });
        });
    });
};
exports.fillMdkApp2SvcEntLinks = fillMdkApp2SvcEntLinks;
const fillFeApp2SvcEntLinks = (items, basePath) => {
    const feApps = items.filter(i => i.type === ItemType_1.ItemType.UI5Application);
    const svcs = items.filter(i => i.type === ItemType_1.ItemType.CAPService);
    const svcEnts = items.filter(i => i.type === ItemType_1.ItemType.ODataV4ServiceEntity);
    return Promise
        .all(feApps.map(feApp => {
        const appFolder = (0, path_1.join)(basePath, feApp.path.replace(/webapp\/manifest.json$/, ''));
        return (0, FioriElmsDependencyResolver_1.findUsedEntitiesFor)(appFolder);
    }))
        .then(depsList => {
        depsList.forEach((deps, idx) => {
            const feApp = feApps[idx];
            deps.forEach(dep => {
                const svc = svcs.find(svc => svc.ref === dep.servicePath);
                const svcEnt = svcEnts.find(svcEnt => {
                    var _a;
                    return svcEnt.name === dep.entityName &&
                        ((_a = svcEnt.links) === null || _a === void 0 ? void 0 : _a.some(link => link.ref === (svc === null || svc === void 0 ? void 0 : svc.ref)));
                });
                if (!svcEnt) {
                    return;
                }
                feApp.links = [...feApp.links || []];
                feApp.links.push({ linkType: project_1.LinkType.DEPENDS_ON, type: svcEnt.type, ref: svcEnt.ref });
            });
        });
    });
};
exports.fillFeApp2SvcEntLinks = fillFeApp2SvcEntLinks;
const getAdjListOf = (item) => {
    const pendingItems = [item];
    const discoveredRefs = new Set([item.ref]);
    while (pendingItems.length) {
        const curItem = pendingItems.pop();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const curDeps = (0, exports.getDirectDependenciesOf)(curItem);
        curItem.dependencies = [];
        [...curDeps]
            .filter(dep => !discoveredRefs.has(dep.ref))
            .forEach(dep => {
            var _a;
            (_a = curItem.dependencies) === null || _a === void 0 ? void 0 : _a.push(dep);
            discoveredRefs.add(dep.ref);
            pendingItems.push(dep);
        });
    }
    return item;
};
exports.getAdjListOf = getAdjListOf;
const getAllDependenciesOf = (item) => {
    const deps = [];
    const pendingItems = [item];
    const discoveredRefs = new Set([item.ref]);
    while (pendingItems.length) {
        const curItem = pendingItems.pop();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const curDeps = (0, exports.getDirectDependenciesOf)(curItem);
        [...curDeps]
            .filter(dep => !discoveredRefs.has(dep.ref))
            .forEach(dep => {
            deps.push(dep);
            discoveredRefs.add(dep.ref);
            pendingItems.push(dep);
        });
    }
    return deps;
};
exports.getAllDependenciesOf = getAllDependenciesOf;
const getDirectDependenciesOf = (item) => dependencyMap.get(item === null || item === void 0 ? void 0 : item.ref) || new Set();
exports.getDirectDependenciesOf = getDirectDependenciesOf;
//# sourceMappingURL=index.js.map