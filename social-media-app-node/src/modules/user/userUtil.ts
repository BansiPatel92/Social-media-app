import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../config/tables";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { UserModel, SocialAuthModel } from "./userModel";
import { Constants } from "../../config/constants";

export class UserUtil {
  // Register user
  public async createUser(userDetail: Json): Promise<ResponseBuilder> {
    const newUser = await My.insert(Tables.USER, userDetail);
    return ResponseBuilder.data({ id: newUser.insertId });
  }

  // Check Email Existancy in database
  public async getDetailByEmail(email: string) {
    return await My.first(Tables.USER, ["id", "name", "email", "password", "signupType"],
      "email = ? AND signupType = ?", [email, Constants.SIGNUP_TYPES.EMAIL]);
  }

  // Check Email Existancy in database
  public async getSocialUser(data: SocialAuthModel) {
    return await My.first(Tables.USER, ["id", "name", "email", "signupType", "providerId"],
      "email = ? AND signupType = ? AND providerId = ?", [data.email, Constants.SIGNUP_TYPES.SOCIAL, data.providerId]);
  }
}