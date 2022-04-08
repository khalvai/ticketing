import { Request, Response, NextFunction } from 'express';
import { UserDocument } from '../model/user.model';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export async function creatToken({
  id,
  isAdmin,
}: {
  id: UserDocument['id'];
  isAdmin: UserDocument['isAdmin'];
}) {
  const jwtPrivateKey = process.env.jwtPrivateKey as Secret;

  const token = jwt.sign({ id, isAdmin }, jwtPrivateKey, {
    expiresIn: '1h',
  });

  return token;
}

