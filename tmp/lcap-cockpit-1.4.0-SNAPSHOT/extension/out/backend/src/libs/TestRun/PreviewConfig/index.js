"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigBy = void 0;
const Task_1 = require("../../../../../common/src/Task");
const WithMockConfig_1 = require("./WithMockConfig");
const WithRemoteConfig_1 = require("./WithRemoteConfig");
const getConfigBy = (mode) => {
    switch (mode) {
        case Task_1.PreviewModes.WithMock:
            return (0, WithMockConfig_1.getConfigWithMock)();
        case Task_1.PreviewModes.WithRemote:
            return (0, WithRemoteConfig_1.getConfigWithHybrid)();
        default:
            return Promise.resolve({ env: {} });
    }
};
exports.getConfigBy = getConfigBy;
//# sourceMappingURL=index.js.map