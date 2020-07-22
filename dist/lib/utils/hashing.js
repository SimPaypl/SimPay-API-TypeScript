"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashing = void 0;
const crypto_1 = require("crypto");
class Hashing {
    static sha256(text) {
        return Hashing.hash('sha256', text);
    }
    static sha1(text) {
        return Hashing.hash('sha1', text);
    }
    static md5(text) {
        return Hashing.hash('md5', text);
    }
    static hash(algorithm, text) {
        const hash = crypto_1.createHash(algorithm);
        hash.update(text);
        return hash.digest('hex').toUpperCase();
    }
}
exports.Hashing = Hashing;
//# sourceMappingURL=hashing.js.map