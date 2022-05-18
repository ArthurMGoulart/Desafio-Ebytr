import { Schema, model as createModel, Document } from 'mongoose';
import { User } from '../interfaces';
import MongoModel from './MongoModel';

export interface UserDocument extends User, Document { }

export const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false },
);

class UserModel extends MongoModel<User> {
  constructor(model = createModel('Users', UserSchema)) {
    super(model);
  }
}

export default UserModel;
