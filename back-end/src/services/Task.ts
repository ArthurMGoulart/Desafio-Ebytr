import { Task, TaskSchema, IdSchema } from '../interfaces';
import Service, { ServiceError } from './Service';
import { TaskModel } from '../models';

class TaskService extends Service<Task> {
  constructor(model = new TaskModel()) {
    super(model);
  }

  create = async (obj: Task): Promise<Task | ServiceError | null> => {
    const parsedTask = TaskSchema.safeParse(obj);
    if (!parsedTask.success) {
      return { error: parsedTask.error };
    }
    return this.model.create(obj);
  };

  readOne = async (id: string): Promise<Task | ServiceError | null> => {
    const parsedId = IdSchema.safeParse({ id });
    if (!parsedId.success) {
      return { error: parsedId.error };
    }
    const TaskFound = this.model.readOne(id);
    return TaskFound;
  };

  update = async (id: string, obj: Task): Promise<Task | ServiceError | null> => {
    const parsedId = IdSchema.safeParse({ id });
    if (!parsedId.success) {
      return { error: parsedId.error };
    }
    const parsedTask = TaskSchema.safeParse(obj);
    if (!parsedTask.success) {
      return { error: parsedTask.error };
    }
    return this.model.update(id, obj);
  };

  delete = async (id: string): Promise<Task | ServiceError | null> => {
    const parsedId = IdSchema.safeParse({ id });
    if (!parsedId.success) {
      return { error: parsedId.error };
    }
    const TaskFound = this.model.delete(id);
    return TaskFound;
  };
}

export default TaskService;
