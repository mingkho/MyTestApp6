"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const debounce = (func, wait = 100) => {
    let timeout;
    return function (...args) {
        return new Promise(res => {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = undefined;
                return res(func(...args));
            }, wait);
        });
    };
};
exports.debounce = debounce;
//# sourceMappingURL=Util.js.map