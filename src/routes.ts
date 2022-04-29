import { Express } from 'express';
import createUserSchema, { createUserTokenSchema } from './schema/user.schema';
import createTicketSchema from './schema/ticket.schema';

import {
  createUserHandler,
  logInUserHandler,
} from './controller/user.controller';
import {
  createTicketHandler,
  getAllResivedTicketHandler,
  deleteTicketHandler,
} from './controller/ticket.controller';
import validateRequest from './middleware/validateRequest';

// importing  middleware  for authanticating
import auth from './middleware/auth';
import roll from './middleware/roll';
import allowedTicketing from './middleware/allowedTicketing';

// schemas for validating inputs

const userSchema = createUserSchema as any;
const userTokenSchema = createUserTokenSchema as any;
const ticketSchema = createTicketSchema as any;

// routes

export default function (app: Express) {
  app.get('/', () => console.log('hey there??/'));
  // sign in user
  app.post('/api/user', validateRequest(userSchema), createUserHandler);

  //log in user

  app.post(
    '/api/user/login',
    validateRequest(userTokenSchema),
    logInUserHandler,
  );

  //creating a ticket
  app.post(
    '/api/ticket',
    [validateRequest(ticketSchema), auth, allowedTicketing],
    createTicketHandler,
  );

  //geting all thickets sent for me

  app.get('/api/ticket', auth, getAllResivedTicketHandler);
  app.delete('/api/ticket/:id', auth, deleteTicketHandler);
}
