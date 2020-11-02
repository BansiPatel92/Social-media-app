import { Router } from "express";
import { Validator } from "../../validate";
import { UserController } from "./userController";
import { UserMiddleware } from "./userMiddleware";
import { AuthModel, UserModel, SocialAuthModel } from "./userModel";

// Use express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

// Authentication Routes
router.post("/sign-up", v.validate(UserModel), userMiddleware.checkEmailExists, userController.signup);
router.post("/sign-in", v.validate(AuthModel), userMiddleware.checkCredentials, userController.signin);
router.post("/social-sign-in", v.validate(SocialAuthModel), userMiddleware.checkSocialCredentials, userController.socialSignin);

// Get All Tweets by search keyword from Linked account
router.post("/tweets", userController.getAllTweets); 

export const UserRoute: Router = router;
