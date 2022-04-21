import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();
const jwtPrivateKey = process.env.jwtPrivateKey;

async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-access-token'] || req.body.token;
  if (!token)
    return res.status(403).send('a token is requierd for authantication');
  try {
    const decode = await jwt.verify(token, jwtPrivateKey as Secret);

    res.locals.jwtPayload = decode;
    console.log(decode);

    next();
  } catch (error) {
    res.status(401).send('invalid token');
  }
}
export default auth;
