"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const jwt = require("jsonwebtoken");
class Jwt {
    /*
    * Get Authentication Token
    */
    static getAuthToken(data) {
        return jwt.sign(data, process.env.JWT_SECRET);
    }
    /*
    * Decode Auth Token
    */
    static decodeAuthToken(token) {
        if (token) {
            try {
                return jwt.verify(token, process.env.JWT_SECRET);
            }
            catch (error) {
                return false;
            }
        }
        return false;
    }
}
exports.Jwt = Jwt;
//# sourceMappingURL=jwt.js.map