import * as bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import * as _ from "lodash";
import { Constants } from "../../config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { UserUtil } from "./userUtil";
import { Jwt } from "../../helpers/jwt";
import { Twitter } from 'twitter';

export class UserController {
  private userUtil: UserUtil = new UserUtil();

  // API call for Sign Up
  public signup = async (req: any, res: Response) => {
    
    // Store Encrypted password
    req.body.password = bcryptjs.hashSync(req.body.password, Constants.PASSWORD_HASH);
    req.body.signupType = Constants.SIGNUP_TYPES.EMAIL;

    // Add profile data in user Database
    const result: ResponseBuilder = await this.userUtil.createUser(req.body);
    
    if (result && result.result && result.result.id) {
      // Generate JWT token
      const { name } = req.body;
      const userDetails = {
        token: Jwt.getAuthToken({ userId: result.result.id }),
        name,
      };
      res.status(result.code).json(userDetails);
    } else {
      res.status(result.code).json(result.result);
    }
  }

  // API call for Sign In using Email
  public signin = async (req: Request, res: Response) => {
    const { signupType, email, name } = req.body._authentication;
    const userDetails = {
      token: Jwt.getAuthToken({ userId: req.body._authentication.id }),
      signupType,
      email,
      name,
    };
    res.status(200).json(userDetails);
  }

  // API to add Google sign-in information
  public socialSignin = async (req: Request, res: Response) => {
    const { email, name, providerId } = req.body._authentication;
    const signupType = Constants.SIGNUP_TYPES.SOCIAL;
    if (req.body._newUser) {
      const user = {
        name,
        providerId,
        signupType,
        email,
      };
      const result: ResponseBuilder = await this.userUtil.createUser(user);
      req.body._authentication.id = result.result.id;
    }
    const userDetails = {
      token: Jwt.getAuthToken({ userId: req.body._authentication.id }),
      signupType,
      email,
      name,
    };
    res.status(200).json(userDetails);
  }

   // Get all tweets from linked twitter account
  public getAllTweets = async (req: Request,res: Response) => {    
    const client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    var query = req.url.match(/[^=]+$/)[0];
    client.get('search/tweets', {q: query}, function(error, tweets, response) {
        var status = tweets.statuses;  
        res.status(tweets.code).json(tweets.result);
    });

    
  }


}