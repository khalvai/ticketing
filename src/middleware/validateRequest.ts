import { AnySchema } from 'yup';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      return next();
    } catch (e: any) {
      console.error(e);
      return res.status(400).send(e.message);
    }
  };

export default validate;
