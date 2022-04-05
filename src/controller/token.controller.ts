import { Request, Response, NextFunction } from 'express';
import { validatePassword } from '../service/user.service';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export async function createTokenHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, _id: id, isAdmin } = req.body;
    const jwtPrivateKey = process.env.jwtPrivateKey as Secret;
    const user = await validatePassword(req.body);
    if (!user) res.status(404).send('invalidpassword or email');

    const token = jwt.sign({ email, id,isAdmin }, jwtPrivateKey, {
      expiresIn: '1h',
    });

    res.status(200).send({ user, token: token });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
