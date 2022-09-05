"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
const GraphWalker = require("../../../../libs/DependencyResolver/GraphWalker");
const project_1 = require("project");
describe('GraphWalker', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can generateGraphFrom items', () => {
        var _a;
        const items = new Array(7).fill(undefined).map((i, idx) => ({
            name: `${idx}`,
            path: `${idx}`,
            ref: `${idx}`,
            type: project_1.ItemType.CDSEntity,
            tags: [],
            links: idx > 5 ? [] : [{ linkType: project_1.LinkType.DEPENDS_ON, type: project_1.ItemType.CDSEntity, ref: `${idx + 1}` },]
        }));
        items[3].links = undefined;
        (_a = items[1].links) === null || _a === void 0 ? void 0 : _a.push({ linkType: project_1.LinkType.HAS_DEPENDENCY, type: project_1.ItemType.CDSEntity, ref: '0' });
        items[5].links = [];
        items[6].links = [{ linkType: project_1.LinkType.HAS_DEPENDENCY, type: project_1.ItemType.CDSEntity, ref: '5' }];
        let res = GraphWalker.generateGraphFrom(items);
        expect([...res]).toHaveLength(items.length);
        res = GraphWalker.generateGraphFrom([
            { ref: '1', links: [{ linkType: project_1.LinkType.HAS_DEPENDENCY, ref: '2' }] },
            { ref: '2', links: [{ linkType: project_1.LinkType.DEPENDS_ON, ref: '1' }] },
        ]);
        expect([...res]).toHaveLength(2);
    });
});
//# sourceMappingURL=GraphWalker.spec.js.map