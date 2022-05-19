import { Model as M, Document } from 'mongoose';
import { ModelUser, User } from '../interfaces';

class MongoModelUser implements ModelUser {

  constructor(protected model: M<User & Document>) { }

  create = async (obj: User): Promise<User> => this.model.create({ ...obj });

  findByEmail = async (email : string): Promise<User | null> => this.model.findOne({ email });

}

export default MongoModelUser;
