"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyDepsOf = exports.stringifyItem = exports.creationTypeLabelMap = exports.labelCreationTypeRevMap = exports.itemLabelMap = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const ItemType_1 = require("../artifact-management/definitions/ItemType");
const CommonCrud_1 = require("./CommonCrud");
exports.itemLabelMap = new Map([
    [ItemType_1.ItemType.CDSEntity, 'Entity'],
    [ItemType_1.ItemType.ODataV4ServiceEntity, 'Service Entity'],
    [ItemType_1.ItemType.CSVFile, 'Sample Data'],
    [ItemType_1.ItemType.MDKApplication, 'User Interface'],
    [ItemType_1.ItemType.UI5Application, 'User Interface'],
    [ItemType_1.ItemType.Workflow, 'Workflow'],
    [ItemType_1.ItemType.SecurityRole, 'User Role'],
    [ItemType_1.ItemType.CAPService, ''],
]);
exports.labelCreationTypeRevMap = new Map([
    [exports.itemLabelMap.get(ItemType_1.ItemType.CDSEntity), CommonCrud_1.CreationType.DataModel],
    [exports.itemLabelMap.get(ItemType_1.ItemType.ODataV4ServiceEntity), CommonCrud_1.CreationType.Service],
    [exports.itemLabelMap.get(ItemType_1.ItemType.CSVFile), CommonCrud_1.CreationType.SampleData],
    [exports.itemLabelMap.get(ItemType_1.ItemType.MDKApplication), CommonCrud_1.CreationType.UI],
    [exports.itemLabelMap.get(ItemType_1.ItemType.Workflow), CommonCrud_1.CreationType.Workflow],
    [exports.itemLabelMap.get(ItemType_1.ItemType.SecurityRole), CommonCrud_1.CreationType.SecurityRole],
    ['External Service Entity', CommonCrud_1.CreationType.ExternalService],
]);
exports.creationTypeLabelMap = [...exports.labelCreationTypeRevMap.entries()].reduce((m, tuple) => m.set(tuple[1], tuple[0]), new Map());
const stringifyItem = (item) => {
    const typeLabel = exports.itemLabelMap.get(item.type);
    const itemType = typeLabel === undefined ? item.type : typeLabel;
    return { label: item.label || item.name, itemType };
};
exports.stringifyItem = stringifyItem;
const stringifyDepsOf = (deps) => deps.map(i => {
    const { itemType, label } = (0, exports.stringifyItem)(i);
    return `${itemType}${itemType ? ' - ' : ''}${label}`;
}).join(', ');
exports.stringifyDepsOf = stringifyDepsOf;
//# sourceMappingURL=i18n.js.map