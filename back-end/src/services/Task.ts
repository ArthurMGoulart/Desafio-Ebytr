import { Task, TaskSchema, IdSchema } from '../interfaces';
import Service from './ServiceCRUD';
import { TaskModel } from '../models';
import { CustomError } from '../utils';
import StatusCode from '../enums';

class TaskService extends Service<Task> {
  constructor(model = new TaskModel()) {
    super(model);
  }

  create = async (obj: Task): Promise<Task> => {
    const parsedTask = TaskSchema.safeParse(obj);
    if (!parsedTask.success) {
      throw new CustomError(StatusCode.BAD_REQUEST, parsedTask.error.issues[0].message);
    }
    return this.model.create(obj);
  };

  readOne = async (id: string): Promise<Task | null> => {
    const parsedId = IdSchema.safeParse({ id });
    if (!parsedId.success) {
      throw new CustomError(StatusCode.BAD_REQUEST, parsedId.error.issues[0].message);
    }
    const TaskFound = this.model.readOne(id);
    return TaskFound;
  };

  update = async (id: string, obj: Task): Promise<Task | null> => {
    const parsedId = IdSchema.safeParse({ id });
    if (!parsedId.success) {
      throw new CustomError(StatusCode.BAD_REQUEST, parsedId.error.issues[0].message);
    }
    const parsedTask = TaskSchema.safeParse(obj);
    if (!parsedTask.success) {
      throw new CustomError(StatusCode.BAD_REQUEST, parsedTask.error.issues[0].message);
    }
    return this.model.update(id, obj);
  };

  delete = async (id: string): Promise<Task | null> => {
    const parsedId = IdSchema.safeParse({ id });
    if (!parsedId.success) {
      throw new CustomError(StatusCode.BAD_REQUEST, parsedId.error.issues[0].message);
    }
    const TaskFound = this.model.delete(id);
    return TaskFound;
  };
}

export default TaskService;
