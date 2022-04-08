import joi from 'joi';


const ticketSchema = joi.object({
  message: joi.string().required(),
});
export default ticketSchema;
