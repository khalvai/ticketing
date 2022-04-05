import mongoose, { ObjectId } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

export interface TicketDocument extends mongoose.Document {
  message: string;
  resiverId: ObjectId;
  senderId: ObjectId;
}

const ticketSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    resiverId: { type: ObjectId, ref: 'User', required: true },

    senderId: { type: ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const Ticket = mongoose.model<TicketDocument>('Ticket', ticketSchema);
export default Ticket;
