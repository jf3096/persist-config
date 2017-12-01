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
const path = require("path");
const index_1 = require("../utils/io/index");
const deasyncPromise = require("deasync-promise");
const homeDirectory = require("os-homedir");
class Config {
    constructor({ rcPath }) {
        this.rcPath = Config.getHomeRCAbs(rcPath);
        this.exist = false;
    }
    static getHomeRCAbs(filename) {
        if (!path.isAbsolute(filename)) {
            return path.resolve(homeDirectory(), filename);
        }
        return filename;
    }
    isExist() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rcPath } = this;
            if (!this.exist) {
                this.exist = yield index_1.default.exist(rcPath);
            }
            return this.exist;
        });
    }
    readRC() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rcPath } = this;
            const isExist = this.isExist();
            if (isExist) {
                return JSON.parse(yield index_1.default.read(rcPath));
            }
            else {
                return {};
            }
        });
    }
    static stringify(rc, space = 4) {
        return JSON.stringify(rc, null, space);
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.readRC();
        });
    }
    set(rc) {
        return __awaiter(this, void 0, void 0, function* () {
            const rcString = Config.stringify(rc || this.rc);
            return index_1.default.write(this.rcPath, rcString);
        });
    }
    getSync() {
        return deasyncPromise(this.get());
    }
    setSync(rc) {
        return deasyncPromise(this.set(rc));
    }
}
exports.default = Config;
//# sourceMappingURL=index.js.map