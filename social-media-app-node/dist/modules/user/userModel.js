"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAuthModel = exports.AuthModel = exports.UserModel = void 0;
const class_validator_1 = require("class-validator");
const userValidator_1 = require("./userValidator");
const model_1 = require("../../model");
class UserModel extends model_1.Model {
    constructor(body) {
        super();
        const { name, email, password, } = body;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(50, { message: "MAX_LENGTH_VALIDATION_FOR_50_CHAR" })
], UserModel.prototype, "name", void 0);
__decorate([
    class_validator_1.IsEmail({}, { message: "EMAIL_INVALID" }),
    class_validator_1.IsNotEmpty()
], UserModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Validate(userValidator_1.IsPasswordMatchesRequirementsConstraint, {
        message: "PASSWORD_WARNING",
    })
], UserModel.prototype, "password", void 0);
exports.UserModel = UserModel;
class AuthModel extends model_1.Model {
    constructor(body) {
        super();
        const { email, password, } = body;
        this.email = email;
        this.password = password;
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail({}, { message: "EMAIL_INVALID" })
], AuthModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], AuthModel.prototype, "password", void 0);
exports.AuthModel = AuthModel;
class SocialAuthModel extends model_1.Model {
    constructor(body) {
        super();
        const { email, providerId, name, } = body;
        this.email = email;
        this.providerId = providerId;
        this.name = name;
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail({}, { message: "EMAIL_INVALID" })
], SocialAuthModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], SocialAuthModel.prototype, "providerId", void 0);
__decorate([
    class_validator_1.IsOptional()
], SocialAuthModel.prototype, "name", void 0);
exports.SocialAuthModel = SocialAuthModel;
//# sourceMappingURL=userModel.js.map