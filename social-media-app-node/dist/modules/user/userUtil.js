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
exports.UserUtil = void 0;
const My = require("jm-ez-mysql");
const tables_1 = require("../../config/tables");
const responseBuilder_1 = require("../../helpers/responseBuilder");
const constants_1 = require("../../config/constants");
class UserUtil {
    // Register user
    createUser(userDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield My.insert(tables_1.Tables.USER, userDetail);
            return responseBuilder_1.ResponseBuilder.data({ id: newUser.insertId });
        });
    }
    // Check Email Existancy in database
    getDetailByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.first(tables_1.Tables.USER, ["id", "name", "email", "password", "signupType"], "email = ? AND signupType = ?", [email, constants_1.Constants.SIGNUP_TYPES.EMAIL]);
        });
    }
    // Check Email Existancy in database
    getSocialUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield My.first(tables_1.Tables.USER, ["id", "name", "email", "signupType", "providerId"], "email = ? AND signupType = ? AND providerId = ?", [data.email, constants_1.Constants.SIGNUP_TYPES.SOCIAL, data.providerId]);
        });
    }
}
exports.UserUtil = UserUtil;
//# sourceMappingURL=userUtil.js.map