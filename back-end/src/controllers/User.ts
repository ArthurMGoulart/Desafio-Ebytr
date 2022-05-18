import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from './Controller';
import UserService from '../services/User';
import { User } from '../interfaces';

class UserController extends Controller<User> {
  private $route: string;

  public service: UserService;

  constructor(
    service = new UserService(),
    route = '/users',
  ) {
    super(service);
    this.$route = route;
    this.service = service;
    this.create = this.create.bind(this);
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  get route() { return this.$route; }

  async create(
    req: RequestWithBody<User>,
    res: Response<User | ResponseError>,
  ): Promise<typeof res> {
    const { body } = req;
    try {
      const user = await this.service.create(body);
      if (!user) return res.status(500).json({ error: 'Null Created' });
      if ('error' in user) {
        const { error } = user;
        return res.status(400).json({ error: error.issues[0].message });
      }
      return res.status(201).json(user);
    } catch (err) {
      const { message } = err as Error;
      return res.status(500).json({ error: message });
    }
  }

  async readOne(
    req: Request,
    res: Response<User | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    try {
      const user = await this.service.readOne(id);
      if (!user) return res.status(404).json({ error: 'Object not found' });
      if ('error' in user) {
        const { error } = user;
        return res.status(400).json({ error: error.issues[0].message });
      }
      return res.status(200).json(user);
    } catch (err) {
      const { message } = err as Error;
      return res.status(500).json({ error: message });
    }
  }

  async update(
    req: RequestWithBody<User>,
    res: Response<User | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    const { body } = req;
    try {
      const user = await this.service.update(id, body);
      if (!user) return res.status(404).json({ error: 'Object not found' });
      if ('error' in user) {
        const { error } = user;
        return res.status(400).json({ error: error.issues[0].message });
      }
      return res.status(200).json(user);
    } catch (err) {
      const { message } = err as Error;
      return res.status(500).json({ error: message });
    }
  }

  async delete(
    req: Request,
    res: Response<User | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    try {
      const user = await this.service.delete(id);
      if (!user) return res.status(404).json({ error: 'Object not found' });
      if ('error' in user) {
        const { error } = user;
        return res.status(400).json({ error: error.issues[0].message });
      }
      return res.status(204).json(user);
    } catch (err) {
      const { message } = err as Error;
      return res.status(500).json({ error: message });
    }
  }
}

export default UserController;
