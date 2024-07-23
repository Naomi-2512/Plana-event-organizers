import dotenv from 'dotenv';
import { NextFunction, Response,Request } from 'express';
import { Tokens } from '../interfaces/interface';
import jwt from 'jsonwebtoken';
dotenv.config();

export interface extendedRequest extends Request {
  info?: Tokens;
}

export const verifyTokens = (req: extendedRequest, res: Response, next: NextFunction) => {

  try {

    let authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      error: "You do not have access, to use this service"
    })
  }
  else {
    let token = authHeader.split(' ')[1] as string;

    let data = jwt.verify(token, process.env.SECRET_KEY as string) as Tokens;

    req.info = data;
    next();
  }

  }
  catch (error) {
    res.status(501).json({
      error
    })
  }

}