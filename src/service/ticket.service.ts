import { DocumentDefinition } from 'mongoose';
import Ticket, { TicketDocument } from '../model/ticketing.model';

export async function createTicket(input: DocumentDefinition<TicketDocument>) {
  try {
    return await Ticket.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

