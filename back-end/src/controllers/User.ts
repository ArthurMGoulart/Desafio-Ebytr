import { Request, Response } from 'express';
import { RequestWithBody, ResponseError } from './Controller';
import { UserService } from '../services';
import { User, UserLogin } from '../interfaces';
import StatusCode from '../enums';

class UserController {
  private $route: string;

  public service: UserService;

  constructor(
    service = new UserService(),
    route = '/users',
  ) {
    this.$route = route;
    this.service = service;
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  get route() { return this.$route; }

  async signUp(
    req: RequestWithBody<User>,
    res: Response<User | ResponseError>,
  ): Promise<typeof res> {
    const { body } = req;
    try {
      const user = await this.service.create(body);
      if (!user) return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Null Created' });
      if ('error' in user) {
        const { error } = user;
        return res.status(StatusCode.BAD_REQUEST).json({ error: error.issues[0].message });
      }
      return res.status(StatusCode.CREATED).json(user);
    } catch (err) {
      const { message } = err as Error;
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: message });
    }
  }

  async login(
    req: RequestWithBody<UserLogin>,
    res: Response<User | ResponseError>,
  ): Promise<typeof res> {
    const { body } = req;
    try {
      const user = await this.service.readOne(id);
      if (!user) return res.status(StatusCode.NOT_FOUND).json({ error: 'Object not found' });
      if ('error' in user) {
        const { error } = user;
        return res.status(StatusCode.BAD_REQUEST).json({ error: error.issues[0].message });
      }
      return res.status(200).json(user);
    } catch (err) {
      const { message } = err as Error;
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: message });
    }
  }

}

export default UserController;
