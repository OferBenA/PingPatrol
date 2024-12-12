import express from 'express';
import jwt from 'jsonwebtoken'

class Utils {
  static convertQueryToNumber(param: any, defaultValue: number): number | null {
    if (typeof param == 'number') {
      return param;
    }

    if (typeof param == 'string') {
      const result = parseInt(param);
      return isNaN(result) ? null : result;
    }

    return defaultValue;
  }
  private static  expirationTime = `${process.env.ACCESS_TOKEN_EXPIRATION_TIME || 30000}ms`


  static validateRequiredParams = (requaredFields: string[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) =>{
      const body = req.body;
      const allFieldsExist = requaredFields.every((field:string) => field in body)
      if(!allFieldsExist) {
        res.status(400).send(`one of the required parameters [${requaredFields.join()}] is missing`);
        return;
      }
      next();
    }
  }
  static generateAccessToken = (payload: object): string => {
    const accessToken = jwt.sign({ ...payload, iat: Date.now() }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: this.expirationTime });
    return accessToken;
  };
}

export default Utils;
