import { Schema, Model as M, model as createModel, Document } from 'mongoose';
import { ModelUser, User } from '../interfaces';
export interface UserDocument extends User, Document { }

export const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false },
);

class UserModel implements ModelUser {

  protected model: M<User & Document>;

  constructor(model = createModel('Users', UserSchema)) {
    this.model = model;
  }

  create = async (obj: User): Promise<UserDocument> => this.model.create({ ...obj });

  findByEmail = async (email : string): Promise<UserDocument | null> => this.model.findOne({ email });

}

export default UserModel;
