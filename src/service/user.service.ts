import { DocumentDefinition, FilterQuery } from 'mongoose';
import User, { UserDocument } from '../model/user.model';
import { omit } from 'lodash';
import exp from 'constants';
import { UrlWithStringQuery } from 'url';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUserByEmail(email: UserDocument['email']) {
  return await User.findOne({ email:email });
}

export function validatePassword(user: UserDocument, password: string) {
  return user.comparePassword(password);
}

export async function findUserById(id: UserDocument['id']) {
  return await User.findById(id);
}
