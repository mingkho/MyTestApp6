"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGraphFrom = exports.isFakeLink = void 0;
const project_1 = require("project");
const ItemType_1 = require("../../../../common/artifact-management/definitions/ItemType");
const directionalLink = new Set([
    project_1.LinkType.HAS_DEPENDENCY,
    project_1.LinkType.TRANSITIVELY_DEPENDS_ON,
    project_1.LinkType.HAS_ASSOCIATION_WITH_MANY,
    project_1.LinkType.HAS_ASSOCIATION_WITH_ONE,
    project_1.LinkType.HAS_COMPOSITION_WITH_MANY,
    project_1.LinkType.HAS_COMPOSITION_WITH_ONE,
]);
const revDirectionalLink = new Set([
    project_1.LinkType.DEPENDS_ON,
    project_1.LinkType.HAS_TRANSITIVE_DEPENDENCY,
    project_1.LinkType.ASSOCIATES_TO_MANY,
    project_1.LinkType.ASSOCIATES_TO_ONE,
]);
const isFakeLink = (item, link) => item.type === ItemType_1.ItemType.CAPService || link.type === ItemType_1.ItemType.CAPService;
exports.isFakeLink = isFakeLink;
const generateGraphFrom = (items) => {
    const adjList = new Map();
    const refItemMap = items.reduce((m, i) => m.set(i.ref, i), new Map());
    items.forEach(item => {
        const targetNodes = adjList.get(item.ref) || new Set();
        if (!item.links) {
            return;
        }
        const filteredLinks = item.links.filter(link => !(0, exports.isFakeLink)(item, link));
        filteredLinks
            .filter(link => directionalLink.has(link.linkType))
            .forEach(link => {
            const targetNode = refItemMap.get(link.ref);
            targetNode && targetNodes.add(targetNode);
        });
        filteredLinks
            .filter(link => revDirectionalLink.has(link.linkType))
            .forEach(link => {
            let linkTargetNodes;
            if (!adjList.has(link.ref)) {
                linkTargetNodes = new Set();
                adjList.set(link.ref, linkTargetNodes);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                linkTargetNodes = adjList.get(link.ref);
            }
            linkTargetNodes.add(item);
        });
        adjList.set(item.ref, targetNodes);
    });
    return adjList;
};
exports.generateGraphFrom = generateGraphFrom;
//# sourceMappingURL=GraphWalker.js.map