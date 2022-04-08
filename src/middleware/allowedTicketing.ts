import { findUserById } from '../service/user.service';
import { findTicketBySenderId } from '../service/ticket.service';
import { Request, Response, NextFunction } from 'express';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { isAdmin, id } = res.locals.jwtPayload;
  console.log(isAdmin);
  if (isAdmin) return next();

  const isTikcetedBefore = await findTicketBySenderId(id);
  if (isTikcetedBefore)
    return res.status(405).send('you are not allowed to send more ticket.');

  next();
}
