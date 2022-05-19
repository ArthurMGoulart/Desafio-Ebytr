import { Task, TaskSchema, IdSchema } from '../interfaces';
import { TaskModel } from '../models';
import { CustomError } from '../utils';
import StatusCode from '../enums';

class TaskService {
  protected model: TaskModel;

  constructor() {
    this.model = new TaskModel();
  }

  create = async (obj: Task): Promise<Task> => {
    const parsedTask = TaskSchema.safeParse(obj);
    if (!parsedTask.success) {
      throw new CustomError(StatusCode.BAD_REQUEST, parsedTask.error.issues[0].message);
    }
    return this.model.create(obj);
  };

  readAllByUser = async (user_id: string): Promise<Task[] | null> => {
    const tasksFound = this.model.readAllByUser(user_id);
    return tasksFound;
  }

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
