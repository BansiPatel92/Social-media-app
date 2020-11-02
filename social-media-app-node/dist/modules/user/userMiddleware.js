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
exports.UserMiddleware = void 0;
const bcryptjs = require("bcryptjs");
const userUtil_1 = require("./userUtil");
class UserMiddleware {
    constructor() {
        this.userUtil = new userUtil_1.UserUtil();
        this.checkEmailExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('Create >>');
            const user = yield this.userUtil.getDetailByEmail(req.body.email);
            if (user) {
                res.status(400).json({ error: "ERR_EMAIL_ALREADY_EXISTS" });
            }
            else {
                next();
            }
        });
        this.checkCredentials = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // Get user data by Email
            const user = yield this.userUtil.getDetailByEmail(req.body.email);
            // Match Credential with database Entry
            if (user && user.id &&
                (yield bcryptjs.compare(req.body.password, user.password))) {
                req.body._authentication = user;
                next();
            }
            else {
                res.status(401).json({ error: "INVALID_CREDENTIALS" });
            }
        });
        this.checkSocialCredentials = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // Get user detail by provider ID
            const user = yield this.userUtil.getSocialUser(req.body);
            if (user && user.id) {
                req.body._authentication = user;
                req.body._newUser = false;
            }
            else {
                req.body._authentication = req.body;
                req.body._newUser = true;
            }
            next();
        });
    }
}
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=userMiddleware.js.map