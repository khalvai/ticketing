import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^a-zA-Z0-9{3,30}$')),
  repeatPassword: Joi.ref('password'),
});
export default userSchema;

export const createUserTokenSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^a-zA-Z0-9{3,30}$')),
});

