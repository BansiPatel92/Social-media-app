import * as jwt from "jsonwebtoken";

export class Jwt {
  /*
  * Get Authentication Token
  */
  public static getAuthToken(data: { userId: number; }) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }

  /*
  * Decode Auth Token
  */
  public static decodeAuthToken(token: string) {
    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
