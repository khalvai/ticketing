import express, { NextFunction, Request, Response, Router } from 'express';
import _, { omit } from 'lodash';
import Ticket, { TicketDocument } from '../model/ticketing.model';
import {
  createTicket,
  getAllResivedTicket,
  findTicketById,
} from '../service/ticket.service';
export async function createTicketHandler(req: Request, res: Response) {
  try {
    const senderId = res.locals.jwtPayload.id;

    const { message, resiverId } = req.body;
    const ticket = await createTicket({
      senderId: senderId,
      resiverId: resiverId,
      message: message,
    });
    res.send(ticket);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
export async function getAllResivedTicketHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = res.locals.jwtPayload;
    const tickets: Array<TicketDocument> = await getAllResivedTicket(id);

    if (!tickets.length)
      res.status(404).send("you haven't received any ticket.");

    res.send(tickets);
  } catch (error: any) {
    res.send(error.message);
  }
}

export async function deleteTicketHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ticketId = req.params.id;
  try {
    const ticket = await findTicketById(ticketId);

    const senderId = ticket?.senderId;
    
    const { id, isAdmin } = res.locals.jwtPayload;
    
    if (isAdmin || senderId == id) {
      await ticket?.remove();
      res.send('deleted successfuly');
    } 
    else res.status(400).send("you aren't allowed to delete this message.");
  } catch (error: any) {
    res.send(error.message);
  }
}
//1366 * 768
