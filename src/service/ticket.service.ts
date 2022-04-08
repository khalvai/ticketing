import { DocumentDefinition } from 'mongoose';
import Ticket, { TicketDocument } from '../model/ticketing.model';

export async function createTicket(input: DocumentDefinition<TicketDocument>) {
  try {
    return await Ticket.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findTicketBySenderId(id: TicketDocument['senderId']) {
  const ticket = await Ticket.findOne({ senderId: id });
  return ticket;
}

export async function getAllResivedTicket(id:TicketDocument["resiverId"]){
const tickets = await Ticket.find({resiverId:id});
return tickets;
}

export async function findTicketById(id:TicketDocument["id"]){
  const ticket= await Ticket.findById(id);
  return ticket;
}