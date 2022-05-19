import { Schema, Model as M, model as createModel, Document } from 'mongoose';
import { ModelTask, Task } from '../interfaces';

export interface TaskDocument extends Task, Document { }

export const TaskSchema = new Schema<TaskDocument>(
  {
    user_id: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
  },
  { versionKey: false },
);

class TaskModel implements ModelTask {

  protected model: M<Task & Document>;

  constructor(model = createModel('Tasks', TaskSchema)) {
    this.model = model;
  }
  
  create = async (task: Task): Promise<Task> => this.model.create({ ...task });

  readAllByUser = async (user_id: string): Promise<Task[]> => this.model.find({ user_id });
  
  readOne = async (id: string): Promise<Task | null> =>
    this.model.findById(id);

  update = async (id: string, task: Task): Promise<Task | null> =>
    this.model.findByIdAndUpdate(id, task, { new: true });

  delete = async (id: string): Promise<Task | null> =>
    this.model.findByIdAndDelete(id);
}

export default TaskModel;
