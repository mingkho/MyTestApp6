"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.silentErrors = exports.OPERATION_ERROR_CODES = exports.SUCCESS_CODE = exports.ShareCommands = exports.PROJ_LIFECYCLE_EXT_ID = void 0;
exports.PROJ_LIFECYCLE_EXT_ID = 'project-lifecycle';
var ShareCommands;
(function (ShareCommands) {
    ShareCommands["AddRemote"] = "addremote";
    ShareCommands["GetRemote"] = "getremote";
    ShareCommands["Pull"] = "pull";
    ShareCommands["Push"] = "push";
    ShareCommands["DiscardChanges"] = "discardchanges";
    ShareCommands["Status"] = "status";
    ShareCommands["GetMergeConflicts"] = "getmergeconflicts";
    ShareCommands["GetConflictsInFile"] = "getconflictsinfile";
    ShareCommands["ConflictsResolvedInFile"] = "conflictsresolvedinfile";
    ShareCommands["CompleteMerge"] = "completemerge";
    ShareCommands["GetDeepLinkUrl"] = "getdeeplinkurl";
    ShareCommands["OpenProjectSharingUI"] = "projectsharingui";
})(ShareCommands = exports.ShareCommands || (exports.ShareCommands = {}));
exports.SUCCESS_CODE = 0;
exports.OPERATION_ERROR_CODES = Object.freeze({
    MERGE_CONFLICT: 1,
    INTERNAL_ERROR: 2,
    NOT_A_GIT_REPO: 3,
    GIT_CLEAR_STASH_FAILED: 4,
    GIT_STASH_APPLY_FAILED: 5,
    GIT_POP_STASH_FAILED: 6,
    GIT_RESET_HARD_HEAD_FAILED: 7,
    GIT_DELETE_LOCAL_BRANCH_FAILED: 8,
    GIT_CHECKOUT_LOCAL_BRANCH_FAILED: 9,
    GIT_FORCE_CHECKOUT_FAILED: 10,
    GIT_PULL_ORIGIN_DEFAULT_FAILED: 11,
    GIT_FETCH_FAILED: 12,
    GIT_STATUS_FAILED: 13,
    GIT_ADD_ALL_FILES_FAILED: 14,
    GIT_COMMIT_FAILED: 15,
    GIT_PUSH_FAILED: 16,
    GIT_CURRENT_BRANCH_FAILED: 17,
    GIT_RESET_SOFT_HEAD_FAILED: 18,
    GIT_CLEAN_FAILED: 19,
    GIT_IS_STASH_PRESENT_FAILED: 20,
    GIT_STASH_FAILED: 21,
    GIT_GET_REMOTES_FAILED: 22,
    REMOTE_NOT_CONFIGURED: 23,
    GIT_GET_MERGE_CONFLICTS_FAILED: 24,
    GIT_CHECKOUT_SINGLE_FILE_FAILED: 25,
    GIT_SELECT_FILE_VERSION: 26,
    GIT_ADD_FILE_FAILED: 27,
    GIT_MERGE_WITH_STRATEGY_FAILED: 28,
    GIT_GET_DEFAULT_BRANCH_FAILED: 29,
    GIT_ADD_REMOTE_FAILED: 30,
    GIT_REMOVE_REMOTE_FAILED: 31,
    GIT_INIT_FAILED: 32,
    GIT_REMOTE_SET_HEAD_FAILED: 33,
    GIT_CREATE_DEFAULT_BRANCH_FAILED: 34,
    GIT_CHECKOUT_TO_BRANCH_FAILED: 35,
    GIT_CONFLICT_DURING_ADD_REMOTE: 36,
    GIT_DISCARD_CHANGES_INVALID_OPTION: 37,
    GIT_GET_REMOTE_URL_FAILED: 38,
    ENTRY_POINT_ENV_VAR_MISSING: 39,
    GIT_REMOTE_URL_NOT_VALID: 40,
    GIT_CHECK_REMOTE_VALIDITY_FAILED: 41
});
exports.silentErrors = [
    exports.OPERATION_ERROR_CODES.NOT_A_GIT_REPO,
    exports.OPERATION_ERROR_CODES.GIT_FETCH_FAILED,
    exports.OPERATION_ERROR_CODES.REMOTE_NOT_CONFIGURED,
];
//# sourceMappingURL=constants.js.map