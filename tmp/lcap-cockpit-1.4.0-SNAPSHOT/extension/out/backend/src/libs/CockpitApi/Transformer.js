"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAllItems = exports.transform = void 0;
const project_1 = require("project");
const CockpitCategories_1 = require("../../../../common/src/CockpitCategories");
const SecurityRole_1 = require("../../../../common/src/SecurityRole");
const CockpitTypeDefs_1 = require("./CockpitTypeDefs");
const transformItemLabel = (entry) => {
    if (entry.type === project_1.ItemType.ODataV4ServiceEntity && entry.external) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        entry.label = entry.name.slice(entry.serviceName.length + 1);
    }
};
const transform = (item, refMap, ui5PathGroup) => {
    var _a, _b;
    const entry = { ...item, label: item.name };
    switch (item.type) {
        case project_1.ItemType.CDSEntity: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const count = Object.keys(item.info || {}).length;
            entry.propertyCount = count;
            entry.secLabelProp = {
                key: 'Property Count',
                val: `${count} ${count > 1 ? 'Properties' : 'Property'}`
            };
            break;
        }
        case project_1.ItemType.ODataV4ServiceEntity: {
            const revLinkToSvc = (_a = item.links) === null || _a === void 0 ? void 0 : _a.find(link => link.linkType === project_1.LinkType.HAS_DEPENDENCY);
            if (!revLinkToSvc) {
                break;
            }
            entry.serviceName = entry.groupInfo = refMap[revLinkToSvc.ref].name;
            entry.secLabelProp = {
                key: 'Service Name',
                val: entry.groupInfo
            };
            break;
        }
        case project_1.ItemType.CSVFile: {
            entry.secLabelProp = {
                key: 'Entry Count',
                val: `${entry.entryCount} ${entry.entryCount > 1 ? 'Entries' : 'Entry'}`
            };
            break;
        }
        case project_1.ItemType.UI5Application: {
            const count = ui5PathGroup[entry.path] || 0;
            entry.secLabelProp = {
                key: 'Page count',
                val: `${count} ${count > 1 ? 'Pages' : 'Page'}`
            };
            break;
        }
        case project_1.ItemType.SecurityRole: {
            entry.label = `${entry.name}${(0, SecurityRole_1.isDefaultSecurityRole)(entry) ? ' (Default)' : ''}`;
            entry.secLabelProp = {
                key: 'Description',
                val: (_b = entry.info) === null || _b === void 0 ? void 0 : _b.description
            };
            break;
        }
        case project_1.ItemType.MDKApplication: {
            const mdkAppFolderPath = entry.path.substring(0, entry.path.lastIndexOf("/") + 1);
            const pageCount = Object.keys(refMap).filter(ref => refMap[ref].type === project_1.ItemType.MDKPage &&
                ref.startsWith(mdkAppFolderPath)).length;
            entry.secLabelProp = {
                key: 'Page count',
                val: `${pageCount} ${pageCount > 1 ? 'Pages' : 'Page'}`
            };
            break;
        }
        default:
            break;
    }
    transformItemLabel(entry);
    return entry;
};
exports.transform = transform;
const UI5CMPS = new Set([project_1.ItemType.UI5View, project_1.ItemType.UI5Component]);
const transformAllItems = (entries) => {
    const dashboard = {};
    const transformedList = [];
    const refMap = entries.reduce((m, ent) => (m[ent.ref] = ent, m), {});
    const ui5CmpGroup = entries
        .filter(ent => UI5CMPS.has(ent.type))
        .reduce((m, ent) => {
        if (m[ent.path] === undefined) {
            m[ent.path] = 0;
        }
        m[ent.path] += 1;
        return m;
    }, {});
    entries.forEach(ent => {
        var _a;
        let category = (_a = CockpitTypeDefs_1.CockpitCategoryMapping[ent.type]) === null || _a === void 0 ? void 0 : _a.category;
        if (!category) {
            return transformedList.push(ent);
        }
        category = category === CockpitCategories_1.CockpitCategories.Service
            ? (ent.external ? CockpitCategories_1.CockpitCategories.ExternalService : category)
            : category;
        let categoryObj = dashboard[category];
        if (!categoryObj) {
            dashboard[category] = categoryObj = { entries: [] };
        }
        const transformedEntry = (0, exports.transform)(ent, refMap, ui5CmpGroup);
        transformedList.push(transformedEntry);
        categoryObj.entries.push(transformedEntry);
    });
    Object.keys(CockpitCategories_1.CockpitCategories)
        .forEach((cate) => dashboard[cate] = dashboard[cate] || { entries: [] });
    return { dashboard, transformedList };
};
exports.transformAllItems = transformAllItems;
//# sourceMappingURL=Transformer.js.map