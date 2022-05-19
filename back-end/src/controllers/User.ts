import { Response } from 'express';
import { RequestWithBody, ResponseError } from '../interfaces';
import { UserService } from '../services';
import { User, UserLogin } from '../interfaces';
import StatusCode from '../enums';
import { CustomError } from '../utils';
import { UserLogged } from '../interfaces/UserInterface';

class UserController {

  public service: UserService;

  constructor(
    service = new UserService(),
  ) {
    this.service = service;
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  async signUp(
    req: RequestWithBody<User>,
    res: Response<UserLogged | ResponseError>,
  ): Promise<typeof res> {
    const { body } = req;
    try {
      const UserLogged = await this.service.signUp(body);
      return res.status(StatusCode.CREATED).json(UserLogged);
    } catch (err) {
      if (err instanceof CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      const { message } = err as Error;
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: message });
    }
  }

  async login(
    req: RequestWithBody<UserLogin>,
    res: Response<UserLogged | ResponseError>,
  ): Promise<typeof res> {
    const { body } = req;
    try {
      const user = await this.service.login(body);
      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      const { message } = err as Error;
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: message });
    }
  }
}

export default UserController;
