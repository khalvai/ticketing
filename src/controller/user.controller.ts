import {
  createUser,
  validatePassword,
  findUser,
} from '../service/user.service';
import express, { NextFunction, Request, Response, Router } from 'express';
import { omit } from 'lodash';
import log from '../logger/index';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    res.send(omit(user.toJSON(), 'password'));
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
export async function getUserHandler(req: Request, res: Response) {
  const email = req.body.email as string;
  const user = await findUser(email);
}

