"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class IO {
    static exist(filename) {
        return new Promise((resolve) => fs.exists(filename, (exists) => resolve(exists)));
    }
    static read(filename) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, (err, data) => err ? reject(err) : resolve(data.toString()));
        });
    }
    static write(filename, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filename, content, (err) => {
                err ? reject(err) : resolve();
            });
        });
    }
}
exports.default = IO;
//# sourceMappingURL=index.js.map