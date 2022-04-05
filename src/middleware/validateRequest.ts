import { AnySchema } from 'yup';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import log from '../logger';

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);

      return next();
    } catch (e: any) {
      log.error(e);
      return res.status(400).send(e.message);
    }
  };

export default validate;
