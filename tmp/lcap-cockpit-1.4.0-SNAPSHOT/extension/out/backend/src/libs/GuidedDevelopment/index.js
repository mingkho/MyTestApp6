"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeGuidedDevOnDemand = void 0;
const HomeActivation_1 = require("../Common/HomeActivation");
const ProjectClient_1 = require("../ProjectClient");
const GuidedDevInvoker_1 = require("./GuidedDevInvoker");
const invokeGuidedDevOnDemand = (ctx) => ProjectClient_1.ProjectClient.hasProj.then(hasProj => {
    if (!hasProj) {
        return Promise.resolve();
    }
    const homeActivatedCount = (0, HomeActivation_1.getActivationCount)(ctx);
    if (homeActivatedCount === 1) {
        return (0, GuidedDevInvoker_1.invokeGuidedDev)();
    }
});
exports.invokeGuidedDevOnDemand = invokeGuidedDevOnDemand;
//# sourceMappingURL=index.js.map