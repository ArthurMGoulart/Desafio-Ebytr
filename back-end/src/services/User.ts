import { User, UserSchema, IdSchema } from '../interfaces';
import Service, { ServiceError } from './Service';
import { UserModel } from '../models';

class UserService extends Service<User> {
  constructor(model = new UserModel()) {
    super(model);
  }

  create = async (obj: User): Promise<User | ServiceError | null> => {
    const parsedUser = UserSchema.safeParse(obj);
    if (!parsedUser.success) {
      return { error: parsedUser.error };
    }
    return this.model.create(obj);
  };

  readOne = async (id: string): Promise<User | ServiceError | null> => {
    const parsedId = IdSchema.safeParse({ id });
    if (!parsedId.success) {
      return { error: parsedId.error };
    }
    const UserFound = this.model.readOne(id);
    return UserFound;
  };

  update = async (id: string, obj: User): Promise<User | ServiceError | null> => {
    const parsedId = IdSchema.safeParse({ id });
    if (!parsedId.success) {
      return { error: parsedId.error };
    }
    const parsedUser = UserSchema.safeParse(obj);
    if (!parsedUser.success) {
      return { error: parsedUser.error };
    }
    return this.model.update(id, obj);
  };

  delete = async (id: string): Promise<User | ServiceError | null> => {
    const parsedId = IdSchema.safeParse({ id });
    if (!parsedId.success) {
      return { error: parsedId.error };
    }
    const UserFound = this.model.delete(id);
    return UserFound;
  };
}

export default UserService;
