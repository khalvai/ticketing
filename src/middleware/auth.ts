import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();
const jwtPrivateKey = process.env.jwtPrivateKey;

async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token') as string;
  if (!token)
    return res.status(403).send('a token is requierd for authantication');

  try {
    const jwtPrivateKey = process.env.jwtPrivateKey as Secret;
    const decode = jwt.verify(token, jwtPrivateKey);

    res.locals.jwtPayload = decode;

    next();
  } catch (error) {
    res.status(401).send('invalid token');
  }
}
export default auth;

