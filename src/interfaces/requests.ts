import jwt from 'jsonwebtoken';
import { Request } from 'express';

export interface UserInRequest extends Request {
  user: jwt.JwtPayload;
}
