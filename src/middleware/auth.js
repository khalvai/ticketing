import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import c from 'config';
dotenv.config();
const jwtPrivateKey = process.env.jwtPrivateKey ;


async function auth(req, res, next) {
  const token = req.headers['x-access-token'] || req.body.token;
  if (!token) res.status(403).send('a token is requierd for authantication');
  try {
    const decode = await jwt.verify(token, jwtPrivateKey);
     
    req.user = decode ;
    console.log(decode);

    console.log('passed succsessfully');
    next();
  } catch (error) {
    res.status(401).send('invalid token');
  }
}
export default auth;
