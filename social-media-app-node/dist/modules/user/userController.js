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
exports.UserController = void 0;
const bcryptjs = require("bcryptjs");
const constants_1 = require("../../config/constants");
const userUtil_1 = require("./userUtil");
const jwt_1 = require("../../helpers/jwt");
const twitter_1 = require("twitter");
class UserController {
    constructor() {
        this.userUtil = new userUtil_1.UserUtil();
        // API call for Sign Up
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Store Encrypted password
            req.body.password = bcryptjs.hashSync(req.body.password, constants_1.Constants.PASSWORD_HASH);
            req.body.signupType = constants_1.Constants.SIGNUP_TYPES.EMAIL;
            // Add profile data in user Database
            const result = yield this.userUtil.createUser(req.body);
            if (result && result.result && result.result.id) {
                // Generate JWT token
                const { name } = req.body;
                const userDetails = {
                    token: jwt_1.Jwt.getAuthToken({ userId: result.result.id }),
                    name,
                };
                res.status(result.code).json(userDetails);
            }
            else {
                res.status(result.code).json(result.result);
            }
        });
        // API call for Sign In using Email
        this.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { signupType, email, name } = req.body._authentication;
            const userDetails = {
                token: jwt_1.Jwt.getAuthToken({ userId: req.body._authentication.id }),
                signupType,
                email,
                name,
            };
            res.status(200).json(userDetails);
        });
        // API to add Google sign-in information
        this.socialSignin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, name, providerId } = req.body._authentication;
            const signupType = constants_1.Constants.SIGNUP_TYPES.SOCIAL;
            if (req.body._newUser) {
                const user = {
                    name,
                    providerId,
                    signupType,
                    email,
                };
                const result = yield this.userUtil.createUser(user);
                req.body._authentication.id = result.result.id;
            }
            const userDetails = {
                token: jwt_1.Jwt.getAuthToken({ userId: req.body._authentication.id }),
                signupType,
                email,
                name,
            };
            res.status(200).json(userDetails);
        });
        // Get all tweets from linked twitter account
        this.getAllTweets = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const client = new twitter_1.Twitter({
                consumer_key: process.env.CONSUMER_KEY,
                consumer_secret: process.env.CONSUMER_SECRET,
                access_token_key: process.env.ACCESS_TOKEN_KEY,
                access_token_secret: process.env.ACCESS_TOKEN_SECRET
            });
            var query = req.url.match(/[^=]+$/)[0];
            client.get('search/tweets', { q: query }, function (error, tweets, response) {
                var status = tweets.statuses;
                res.status(tweets.code).json(tweets.result);
            });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map