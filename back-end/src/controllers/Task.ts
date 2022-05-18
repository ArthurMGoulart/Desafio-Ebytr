import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from './Controller';
import { TaskService } from '../services';
import { Task } from '../interfaces';
import StatusCode from '../enums';

class TaskController extends Controller<Task> {
  private $route: string;

  public service: TaskService;

  constructor(
    service = new TaskService(),
    route = '/tasks',
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
    req: RequestWithBody<Task>,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> {
    const { body } = req;
    try {
      const task = await this.service.create(body);
      if (!task) return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Null Created' });
      if ('error' in task) {
        const { error } = task;
        return res.status(StatusCode.BAD_REQUEST).json({ error: error.issues[0].message });
      }
      return res.status(StatusCode.CREATED).json(task);
    } catch (err) {
      const { message } = err as Error;
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: message });
    }
  }

  async readOne(
    req: Request,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    try {
      const task = await this.service.readOne(id);
      if (!task) return res.status(StatusCode.NOT_FOUND).json({ error: 'Object not found' });
      if ('error' in task) {
        const { error } = task;
        return res.status(StatusCode.BAD_REQUEST).json({ error: error.issues[0].message });
      }
      return res.status(StatusCode.OK).json(task);
    } catch (err) {
      const { message } = err as Error;
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: message });
    }
  }

  async update(
    req: RequestWithBody<Task>,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    const { body } = req;
    try {
      const task = await this.service.update(id, body);
      if (!task) return res.status(StatusCode.NOT_FOUND).json({ error: 'Object not found' });
      if ('error' in task) {
        const { error } = task;
        return res.status(StatusCode.BAD_REQUEST).json({ error: error.issues[0].message });
      }
      return res.status(StatusCode.OK).json(task);
    } catch (err) {
      const { message } = err as Error;
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: message });
    }
  }

  async delete(
    req: Request,
    res: Response<Task | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    try {
      const task = await this.service.delete(id);
      if (!task) return res.status(StatusCode.NOT_FOUND).json({ error: 'Object not found' });
      if ('error' in task) {
        const { error } = task;
        return res.status(StatusCode.BAD_REQUEST).json({ error: error.issues[0].message });
      }
      return res.status(StatusCode.NO_CONTENT).json(task);
    } catch (err) {
      const { message } = err as Error;
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: message });
    }
  }
}

export default TaskController;
