"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("project");
const sinon_1 = require("sinon");
const CDSGraphicalModelerApi_1 = require("../../../../libs/CommonCrudLibs/CDSGraphicalModelerApi");
describe('CDSGraphicalModelerApi', () => {
    const sandbox = (0, sinon_1.createSandbox)();
    it('can getQualifiedNameOf', () => {
        expect((0, CDSGraphicalModelerApi_1.getQualifiedNameOf)({ ref: 'ref', type: project_1.ItemType.CAPService })).toBe('ref');
        expect((0, CDSGraphicalModelerApi_1.getQualifiedNameOf)({ ref: 'ns.name', type: project_1.ItemType.CDSEntity })).toBe('ns.name');
        expect((0, CDSGraphicalModelerApi_1.getQualifiedNameOf)({
            ref: 'srv/name', name: 'name',
            type: project_1.ItemType.ODataV4ServiceEntity, serviceName: 'svc'
        })).toBe('svc.name');
    });
    it('can tell if isProjection', () => {
        expect((0, CDSGraphicalModelerApi_1.isProjection)({
            type: project_1.ItemType.ODataV4ServiceEntity,
            links: [{ linkType: project_1.LinkType.HAS_DEPENDENCY, type: project_1.ItemType.CDSEntity }]
        })).toBe(true);
    });
});
//# sourceMappingURL=CDSGraphicalModelerApi.spec.js.map