import { User, UserSchema, UserLogin, UserLoginSchema } from '../interfaces';
import { ServiceError } from './ServiceCRUD';
import { UserModel } from '../models';
import { CustomError } from '../utils';
import StatusCode from '../enums';
import { Md5 } from "md5-typescript";
import { signToken } from '../auth';

class UserService {

  protected model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  signUp = async ({ name, email, password }: User): Promise<string | ServiceError> => {
    const parsedUser = UserSchema.safeParse({ name, email, password });
    if (!parsedUser.success) {
      throw new CustomError(StatusCode.BAD_REQUEST, parsedUser.error.issues[0].message)
    }
    const checkEmail = this.model.findByEmail(email);
    if (checkEmail) {
      throw new CustomError(StatusCode.CONFLICT, 'Email already registered');
    }
    const newUser = {
      name,
      email,
      password: Md5.init(password)
    }
    console.log(newUser);
    const { id } = this.model.create(newUser);
    const token = signToken({ id, name, email});
    return token;
  };

  login = async ({ email, password }: UserLogin): Promise<string | ServiceError> => {
    const parsedUserLogin = UserLoginSchema.safeParse({ email, password });
    if (!parsedUserLogin.success) {
      throw new CustomError(StatusCode.BAD_REQUEST, parsedUserLogin.error.issues[0].message);
    }
    const user = this.model.findByEmail(email);
    if (!user) {
      throw new CustomError(StatusCode.NOT_FOUND, 'Email not Found');
    }
    const { id, name, password: userPassword } = user;
    if (Md5.init(password) !== userPassword) {
      throw new CustomError(StatusCode.UNAUTHORIZED, 'Password does not match');
    }
    const token = signToken({ id, name, email });
    return token;
  };

}

export default UserService;
