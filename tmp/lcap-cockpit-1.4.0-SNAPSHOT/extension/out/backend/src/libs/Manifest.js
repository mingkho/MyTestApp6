"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHomePkgJson = exports.homePkgJson = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
exports.homePkgJson = {
    current: Promise.resolve(undefined)
};
const setHomePkgJson = (baseDir) => exports.homePkgJson.current = fs_1.promises
    .readFile((0, path_1.join)(baseDir, 'package.json'), 'utf8')
    .then(str => JSON.parse(str))
    .catch(() => undefined);
exports.setHomePkgJson = setHomePkgJson;
//# sourceMappingURL=Manifest.js.map