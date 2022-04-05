import { NextFunction } from 'express';
import { UserInRequest } from '../interfaces/requests';
import jwt from 'jsonwebtoken';

export async function rool(
  req: UserInRequest,
  res: Response,
  next: NextFunction,
) {
  console.log(req.user.isAdmin);
}
