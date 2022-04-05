import joi from "joi"
import {Schema} from 'mongoose';

const ticketSchema =joi.object({
    message:joi.string().required(),
})
export default ticketSchema  ;