  import express, { NextFunction, Request, Response, Router } from 'express';
  import { createTicket } from '../service/ticket.service';
 import { UserInRequest } from '../middleware/auth';
  export async function createTicketHandler(req: UserInRequest, res: Response) {
    try {
      const ticket = await createTicket(req.body);
      res.send(ticket);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }


  