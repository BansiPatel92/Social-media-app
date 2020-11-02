"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const jwt_1 = require("./helpers/jwt");
const My = require("jm-ez-mysql");
const tables_1 = require("./config/tables");
class Middleware {
    constructor() {
        this.getUserAuthorized = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.headers.authorization) {
                const tokenInfo = jwt_1.Jwt.decodeAuthToken(req.headers.authorization.toString());
                if (tokenInfo) {
                    const user = yield My.first(tables_1.Tables.USER, ["id", "signupType", "email", "name"], "id = ?", [tokenInfo.userId]);
                    if (user) {
                        req.body._user = user;
                        next();
                    }
                    else {
                        res.status(401).json({ error: "ERR_UNAUTHORIZED" });
                        return;
                    }
                }
                else {
                    res.status(401).json({ error: "ERR_UNAUTHORIZED" });
                    return;
                }
            }
            else {
                // i.e originally error will be `req.t("ERR_UNAUTHORIZED")` so we can change messages in different language easily
                res.status(401).json({ error: "ERR_UNAUTHORIZED" });
                return;
            }
        });
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map