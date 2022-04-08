import {
  createUser,
  validatePassword,
  findUserByEmail,
} from '../service/user.service';
import express, { NextFunction, Request, Response, Router } from 'express';
import { omit } from 'lodash';
import log from '../logger/index';
import { creatToken } from '../controller/token.controller';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    const { _id: id, isAdmin } = user;
    const token = await creatToken({ id, isAdmin });
    res.send({ user: omit(user, 'password'), token: token });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
export async function logInUserHandler(req: Request, res: Response) {

  const { email, password: candidatePassword } = req.body;
  
  const user = await findUserByEmail(email);
  
  if (!user) return res.status(404).send('invalid email or password');
  
  const isValidPassword = validatePassword(user, candidatePassword);

  if (!isValidPassword)
    return res.status(403).send('invalid email or password');

  const { _id: id, isAdmin } = user;

  const token = await creatToken({ id, isAdmin });
  
  res.send({ user: omit(user, 'password'), token: token });
}
