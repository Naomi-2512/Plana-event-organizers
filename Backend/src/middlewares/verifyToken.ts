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

    let token = req.headers['token'] as string;

  if (!token) {
    return res.status(401).json({
      error: "You do not have access, to use this service"
    })
  }
  else {

    let data = jwt.verify(token, process.env.SECRET_KEY as string) as Tokens;

    req.info = data;

  }

  }
  catch (error) {
    res.status(501).json({
      error
    })
  }

  next();
}