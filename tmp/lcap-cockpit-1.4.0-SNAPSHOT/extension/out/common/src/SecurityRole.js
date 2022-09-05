"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefaultSecurityRole = void 0;
const ItemType_1 = require("../artifact-management/definitions/ItemType");
const isDefaultSecurityRole = ({ name, type }) => type === ItemType_1.ItemType.SecurityRole &&
    ['any', 'authenticated-user', 'system-user'].includes(name);
exports.isDefaultSecurityRole = isDefaultSecurityRole;
//# sourceMappingURL=SecurityRole.js.map