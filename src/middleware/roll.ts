import { Request, Response, NextFunction } from 'express';
async function roll(req: Request, res: Response, next: NextFunction) {
  const isAdmin = res.locals.jwtPayload.isAdmin;
  if (!isAdmin) res.status(403).send('access denied');

  next();
}

export default roll;
