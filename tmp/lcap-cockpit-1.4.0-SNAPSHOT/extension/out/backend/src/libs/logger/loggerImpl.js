"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLogger = exports.getLogger = void 0;
const Manifest_1 = require("../Manifest");
const assert_1 = require("assert");
const vscode_1 = require("vscode");
const wrapper_1 = require("@vscode-logging/wrapper");
const noopLogger_1 = require("./noopLogger");
const LOG_LV_PROP = "lcap.homeLogging.loggingLevel";
const SRC_LOC_PROP = "lcap.homeLogging.srcLocTracking";
let loggerImpl;
const getLogger = () => loggerImpl || noopLogger_1.NOOP_LOGGER;
exports.getLogger = getLogger;
const setLogger = (newLogger) => loggerImpl = newLogger;
const initLogger = (ctx) => Manifest_1.homePkgJson.current
    .then(meta => {
    var _a, _b;
    if (!meta) {
        return;
    }
    const cfgProps = (_b = (_a = meta === null || meta === void 0 ? void 0 : meta.contributes) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.properties;
    (0, assert_1.ok)(cfgProps === null || cfgProps === void 0 ? void 0 : cfgProps[LOG_LV_PROP]);
    (0, assert_1.ok)(cfgProps[SRC_LOC_PROP]);
    const extLogger = (0, wrapper_1.configureLogger)({
        extName: meta.name,
        logPath: ctx.logPath,
        logOutputChannel: vscode_1.window.createOutputChannel(meta.name),
        logConsole: true,
        loggingLevelProp: LOG_LV_PROP,
        sourceLocationProp: SRC_LOC_PROP,
        subscriptions: ctx.subscriptions
    });
    setLogger(extLogger);
})
    .catch(() => undefined);
exports.initLogger = initLogger;
//# sourceMappingURL=loggerImpl.js.map