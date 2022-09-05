"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('EntityEditor', () => {
    it('is interface', () => {
        class Foobar {
            exec() { }
        }
        expect(typeof new Foobar().exec).toBe('function');
    });
});
//# sourceMappingURL=EntityEditor.spec.js.map