"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transformer_1 = require("../../../../../src/libs/CockpitApi/Transformer");
const project_1 = require("project");
describe('Transformer', () => {
    describe('transformAll', () => {
        it('can transform MDK App', () => {
            let ent = (0, Transformer_1.transform)({ type: project_1.ItemType.MDKApplication, path: 'a/app', ref: 'a/app', name: 'a', tags: [] }, {
                'aa/b': { type: project_1.ItemType.MDKPage },
                'a/b': { type: project_1.ItemType.MDKPage },
                'a/c': { type: project_1.ItemType.MDKPage },
                'b/d': { type: project_1.ItemType.MDKPage },
                'c/d': { type: project_1.ItemType.UI5Component },
            }, {});
            expect(ent.secLabelProp.val).toBe('2 Pages');
            ent = (0, Transformer_1.transform)({ type: project_1.ItemType.MDKApplication, path: 'a/app', ref: 'a/app', name: 'a', tags: [] }, {}, {});
            expect(ent.secLabelProp.val).toBe('0 Page');
        });
        it('can transform UI5 App', () => {
            let ent = (0, Transformer_1.transform)({ type: project_1.ItemType.UI5Application, path: 'a', ref: 'a', name: 'a', tags: [] }, {}, { 'a': 10 });
            expect(ent.secLabelProp.val).toBe('10 Pages');
            ent = (0, Transformer_1.transform)({ type: project_1.ItemType.UI5Application, path: 'a', ref: 'a', name: 'a', tags: [] }, {}, {});
            expect(ent.secLabelProp.val).toBe('0 Page');
        });
        it('can transform CSV File', () => {
            let ent = (0, Transformer_1.transform)({ type: project_1.ItemType.CSVFile, path: 'a', ref: 'a', name: 'a', entryCount: 10 }, {}, {});
            expect(ent.secLabelProp.val).toBe('10 Entries');
            ent = (0, Transformer_1.transform)({ type: project_1.ItemType.CSVFile, path: 'a', ref: 'a', name: 'a', entryCount: 0 }, {}, {});
            expect(ent.secLabelProp.val).toBe('0 Entry');
        });
        it('can transform Service Entity', () => {
            let ent = (0, Transformer_1.transform)({
                type: project_1.ItemType.ODataV4ServiceEntity,
                path: 'a', ref: 'a', name: 'a',
                links: [{ linkType: project_1.LinkType.HAS_DEPENDENCY, ref: 'a/b' }]
            }, { 'a/b': { name: 'serviceName' } }, {});
            expect(ent.secLabelProp.val).toBe('serviceName');
            ent = (0, Transformer_1.transform)({
                type: project_1.ItemType.ODataV4ServiceEntity,
                path: 'a', ref: 'a', name: 'a', tags: []
            }, {}, {});
            expect(ent.secLabelProp).toBe(undefined);
        });
        it('can transform CDS Entity', () => {
            let ent = (0, Transformer_1.transform)({
                type: project_1.ItemType.CDSEntity,
                path: 'a', ref: 'a', name: 'a',
                info: { 'a': 'a', 'b': 'b' }
            }, {}, {});
            expect(ent.secLabelProp.val).toBe('2 Properties');
            ent = (0, Transformer_1.transform)({ type: project_1.ItemType.CDSEntity, path: 'a', ref: 'a', name: 'a', tags: [] }, {}, {});
            expect(ent.secLabelProp.val).toBe('0 Property');
        });
        it('can exit with default', () => {
            const ent = (0, Transformer_1.transform)({ type: project_1.ItemType.MDKStyle, path: 'a', ref: 'a', name: 'a', tags: [] }, {}, {});
            expect(ent.type).toBe(project_1.ItemType.MDKStyle);
        });
    });
    describe('transformAll', () => {
        it('can transformAll', () => {
            (0, Transformer_1.transformAllItems)([
                { type: project_1.ItemType.UI5Component, path: 'a', ref: 'a', name: 'a', tags: [] },
                { type: project_1.ItemType.UI5Component, path: 'b', ref: 'b', name: 'b', tags: [] },
                { type: project_1.ItemType.UI5Component, path: 'a', ref: 'c', name: 'c', tags: [] },
                { type: project_1.ItemType.MDKStyle, path: 'a', ref: 'c', name: 'c', tags: [] },
                { type: project_1.ItemType.CDSEntity, path: 'a', ref: 'c', name: 'c', tags: [] },
                { type: project_1.ItemType.CDSEntity, path: 'a2', ref: 'c2', name: 'c2', tags: [] },
                { type: project_1.ItemType.ODataV4ServiceEntity, path: 'a', ref: 'c', name: 'c', tags: [] },
                { type: project_1.ItemType.CAPService, path: 'd', ref: 'e', name: 'e', tags: [] },
                { type: project_1.ItemType.ODataV4ServiceEntity, external: true, path: 'a', ref: 'c', name: 'c', tags: [], links: [{ linkType: project_1.LinkType.HAS_DEPENDENCY, type: project_1.ItemType.CAPService, ref: 'e' }] },
            ]);
        });
    });
});
//# sourceMappingURL=Transformer.spec.js.map