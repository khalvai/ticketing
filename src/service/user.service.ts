import { DocumentDefinition, FilterQuery } from 'mongoose';
import User, { UserDocument } from '../model/user.model';
import { omit } from 'lodash';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUser(email: UserDocument['email']) {
  const user = await User.findOne({ email });
  if (!user)
         return false;
   return user;      
}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument['email'];
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) return false;

  const isValid = user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}
