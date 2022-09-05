"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeployInfo = void 0;
const ProjectClient_1 = require("../ProjectClient");
const info_1 = require("./info");
const getDeployInfo = () => ProjectClient_1.ProjectClient.projApi.then(api => (0, info_1.getLatestDeployInfo)(api));
exports.getDeployInfo = getDeployInfo;
//# sourceMappingURL=index.js.map