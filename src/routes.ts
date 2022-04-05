import { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import createUserSchema, { createUserTokenSchema } from './schema/user.schema';
import createTicketSchema from './schema/ticket.schema';

import { createUserHandler } from './controller/user.controller';
import { createTicketHandler } from './controller/ticket.controller';
import { createTokenHandler } from './controller/token.controller';
import validateRequest from './middleware/validateRequest';
const roll = require('./middleware/roll');
const auth = require('./middleware/auth');
const userSchema = createUserSchema as any;
const userTokenSchema = createUserTokenSchema as any;
const ticketSchema = createTicketSchema as any;
export default function (app: Express) {
  // sign in user
  app.post('/api/user', validateRequest(userSchema), createUserHandler);

  //logs in user

  app.post(
    '/api/user/login',
    validateRequest(userTokenSchema),
    createTokenHandler,
  );
  app.get('/api/test', auth, () => console.log('here'));

  app.post(
    '/api/ticket',
    [validateRequest(ticketSchema), auth, roll],
    createTicketHandler,
  );
}
