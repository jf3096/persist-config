"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const chai_1 = require("chai");
const path = require("path");
const os_1 = require("os");
describe('src/models/index', () => {
    it('set', () => __awaiter(this, void 0, void 0, function* () {
        const config = new index_1.default({ rcPath: '.global-config' });
        const data = { aa: 123 };
        yield config.set(data);
        chai_1.expect(yield config.get()).to.be.eql(data);
    }));
    it('setSync', () => {
        const config = new index_1.default({ rcPath: '.global-config' });
        const data = { aa: 'sync' };
        config.setSync(data);
        chai_1.expect(config.getSync()).to.be.eql(data);
    });
    it('set: abs path', () => {
        const abs = path.resolve(os_1.tmpdir(), '.global-config');
        const config = new index_1.default({ rcPath: abs });
        chai_1.expect(config.rcPath).to.be.equal(abs);
        const data = { aa: 'sync' };
        config.setSync(data);
        chai_1.expect(config.getSync()).to.be.eql(data);
    });
});
//# sourceMappingURL=index.spec.js.map