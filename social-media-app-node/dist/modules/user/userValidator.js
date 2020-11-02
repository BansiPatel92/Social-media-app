"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPasswordMatchesRequirementsConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsPasswordMatchesRequirementsConstraint = class IsPasswordMatchesRequirementsConstraint {
    validate(password, args) {
        /*
        == Regex for password Validation ==
         one uppercase,
         one lowercase,
         min length 6,
         max length 30
         no white space
         */
        const regex = new RegExp("^(?!.* )(?=.*?[A-Z])(?=.*?[a-z]).{6,30}$");
        return regex.test(password);
    }
};
IsPasswordMatchesRequirementsConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: false })
], IsPasswordMatchesRequirementsConstraint);
exports.IsPasswordMatchesRequirementsConstraint = IsPasswordMatchesRequirementsConstraint;
//# sourceMappingURL=userValidator.js.map