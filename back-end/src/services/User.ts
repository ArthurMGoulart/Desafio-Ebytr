import { User, UserSchema, IdSchema, UserLogin, UserLoginSchema } from '../interfaces';
import { ServiceError } from './Service';
import { UserModel } from '../models';
import { Model } from '../interfaces';

class UserService {

  protected model: Model<User>;

  constructor() {
    this.model = new UserModel();
  }

  signUp = async (obj: User): Promise<User | ServiceError | null> => {
    const parsedUser = UserSchema.safeParse(obj);
    if (!parsedUser.success) {
      return { error: parsedUser.error };
    }
    return this.model.create(obj);
  };

  login = async (obj: UserLogin): Promise<User | ServiceError | null> => {
    const parsedUserLogin = UserLoginSchema.safeParse(obj);
    if (!parsedUserLogin.success) {
      return { error: parsedUserLogin.error };
    }
    const UserFound = this.model.readOne(id);
    return UserFound;
  };

}

export default UserService;
