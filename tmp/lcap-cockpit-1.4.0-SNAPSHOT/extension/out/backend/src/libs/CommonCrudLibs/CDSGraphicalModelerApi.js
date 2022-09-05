"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProjection = exports.getQualifiedNameOf = exports.Projectionables = exports.ActionType = exports.TargetType = exports.CDS_CMDS = void 0;
const project_1 = require("project");
exports.CDS_CMDS = {
    OPEN_WITH_PARAMS: 'cds.graphical.modeler.openWithParametersForLCAP',
    DELETE: 'cds.graphical.modeler.delete'
};
var TargetType;
(function (TargetType) {
    TargetType["Entity"] = "Entity";
    TargetType["Service"] = "Service";
    TargetType["Projection"] = "Projection";
    TargetType["View"] = "View";
    TargetType["Type"] = "Type";
    TargetType["Structure"] = "Structure";
    TargetType["Enum"] = "Enum";
})(TargetType = exports.TargetType || (exports.TargetType = {}));
var ActionType;
(function (ActionType) {
    ActionType["Create"] = "create";
    ActionType["Select"] = "select";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
exports.Projectionables = new Set([project_1.ItemType.CDSEntity, project_1.ItemType.ODataV4ServiceEntity]);
/**
 * As of 2111, the following rules can be observed from ProjectAPI's parsing logic:
 * 1. Service Entity v.s. Entity. The boundary can be service block.
 * 2. Projection outside of service block won't exist in the output of readItems API directly
 */
const getQualifiedNameOf = (item) => !exports.Projectionables.has(item.type)
    ? item.ref
    : item.ref.includes('/')
        ? `${item.serviceName}.${item.external ? item.label : item.name}`
        : item.ref;
exports.getQualifiedNameOf = getQualifiedNameOf;
const isProjection = (item) => exports.Projectionables.has(item.type) &&
    item.links &&
    item.links
        .some(link => link.linkType === project_1.LinkType.HAS_DEPENDENCY && exports.Projectionables.has(link.type));
exports.isProjection = isProjection;
//# sourceMappingURL=CDSGraphicalModelerApi.js.map