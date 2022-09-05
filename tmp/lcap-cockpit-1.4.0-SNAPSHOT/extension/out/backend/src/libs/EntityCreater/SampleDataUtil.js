"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cdsdkIsLegacy = exports.refreshSampleDataEditor = exports.getCdsdkVer = exports.createAndShowSampleDataFile = exports.countEntries = exports.showFile = exports.isSampleFileExists = exports.createCSVForSampleData = exports.relDirFor = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const notify_1 = require("../logger/notify");
const path_1 = require("path");
const vscode_1 = require("vscode");
const SampleDataEditor_1 = require("../EntityEditor/SampleDataEditor");
const relDirFor = (isExternal = false) => (0, path_1.join)(...(isExternal
    ? ['srv', 'external', 'data']
    : ['db', 'data']));
exports.relDirFor = relDirFor;
const getRelFilePaths = (ns, ent, isExternal = false) => [
    `${ns}-${ent}.csv`,
    `${ent}.csv`,
].map(name => (0, path_1.join)((0, exports.relDirFor)(isExternal), name));
const getExistingPath = (ns, ent, isExternal = false, projPath) => getRelFilePaths(ns, ent, isExternal)
    .map(relP => (0, path_1.join)(projPath, relP))
    .find(p => (0, fs_1.existsSync)(p));
const createCSVForSampleData = (projPath, ns, ent, force = false, isExternal = false) => {
    const outArgs = isExternal ? `-o ${(0, exports.relDirFor)(isExternal)}` : '';
    const forArgs = `--for "^${isExternal ? ent : `${ns}.${ent}`}$"`;
    const forceArgs = force ? '--force' : '';
    const command = `cds add data ${forArgs} ${outArgs} ${forceArgs}`;
    try {
        (0, child_process_1.execSync)(command, { cwd: projPath });
    }
    catch (err) {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
        (0, notify_1.notify)(`Creating Sample Data for ${ent} failed: ${err}`, notify_1.NotifyDest.ErrMsgBox);
        throw err;
    }
};
exports.createCSVForSampleData = createCSVForSampleData;
const isSampleFileExists = (ns, ent, isExternal, projPath) => getExistingPath(ns, ent, isExternal, projPath) ? true : false;
exports.isSampleFileExists = isSampleFileExists;
const showFile = async (ns, ent, isExternal, projPath) => {
    const p = getExistingPath(ns, ent, isExternal, projPath);
    if (!p) {
        return Promise.resolve();
    }
    return new SampleDataEditor_1.default().exec(vscode_1.Uri.parse((0, path_1.join)("file:", p)));
};
exports.showFile = showFile;
const countEntries = (rawCsv) => {
    const len = rawCsv
        .split(eolFor(rawCsv))
        .map(row => row.trim())
        .filter(row => row)
        .length - 1;
    return len < 0 ? 0 : len;
};
exports.countEntries = countEntries;
const createAndShowSampleDataFile = async (ns, ent, projPath, isExternal = false) => {
    if (exports.cdsdkIsLegacy) {
        return (0, notify_1.notify)('CDS-DK Version is too low. Require 4.2.0 or above.', notify_1.NotifyDest.ErrMsgBox);
    }
    const init$ = (0, exports.isSampleFileExists)(ns, ent, isExternal, projPath)
        ? vscode_1.window.showInformationMessage(`Sample Data for ${ns}.${ent} already exists. Do you want to override it?`, 'Yes', 'Don\'t override').then(choice => choice === 'Yes' ? true : false)
        : Promise.resolve(true);
    return init$
        .then(shouldExec => shouldExec
        ? (0, exports.createCSVForSampleData)(projPath, ns, ent, shouldExec, isExternal)
        : undefined)
        .then(() => (0, exports.showFile)(ns, ent, isExternal, projPath), err => {
        (0, notify_1.notify)(err, notify_1.NotifyDest.ErrLog);
        (0, notify_1.notify)(`Cannot create Sample Data File for ${ent} failed: ${err}`, notify_1.NotifyDest.ErrMsgBox);
    });
};
exports.createAndShowSampleDataFile = createAndShowSampleDataFile;
const eolFor = (s) => s.includes("\r\n")
    ? "\r\n"
    : s.includes("\n")
        ? "\n"
        : "\r\n";
const getCdsdkVer = () => {
    try {
        const output = (0, child_process_1.execSync)('cds version').toString();
        const newLine = eolFor(output);
        const verInfos = output.split(newLine);
        const cdsdkInfo = verInfos.find(ver => ver.includes("@sap/cds-dk"));
        if (!cdsdkInfo) {
            throw new Error('version of cds-dk not found');
        }
        const cdsdkVer = cdsdkInfo.split(":")[1].split('.').join('');
        return +cdsdkVer;
    }
    catch (error) {
        (0, notify_1.notify)(error, notify_1.NotifyDest.ErrLog);
        return 0;
    }
};
exports.getCdsdkVer = getCdsdkVer;
const refreshSampleDataEditor = (delay = 0) => new Promise(res => setTimeout(() => res(vscode_1.commands.executeCommand('lcap.sampledata.editor.refresh')), delay));
exports.refreshSampleDataEditor = refreshSampleDataEditor;
exports.cdsdkIsLegacy = (0, exports.getCdsdkVer)() < 420;
//# sourceMappingURL=SampleDataUtil.js.map