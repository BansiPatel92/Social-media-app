"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const validate_1 = require("../../validate");
const userController_1 = require("./userController");
const userMiddleware_1 = require("./userMiddleware");
const userModel_1 = require("./userModel");
// Use express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const userController = new userController_1.UserController();
const userMiddleware = new userMiddleware_1.UserMiddleware();
// Authentication Routes
router.post("/sign-up", v.validate(userModel_1.UserModel), userMiddleware.checkEmailExists, userController.signup);
router.post("/sign-in", v.validate(userModel_1.AuthModel), userMiddleware.checkCredentials, userController.signin);
router.post("/social-sign-in", v.validate(userModel_1.SocialAuthModel), userMiddleware.checkSocialCredentials, userController.socialSignin);
// Get All Tweets by search keyword from Linked account
router.post("/tweets", userController.getAllTweets);
exports.UserRoute = router;
//# sourceMappingURL=userRoute.js.map