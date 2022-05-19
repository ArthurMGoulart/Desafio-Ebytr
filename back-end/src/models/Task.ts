import { Schema, model as createModel, Document } from 'mongoose';
import { Task } from '../interfaces';
import MongoModelCRUD from './MongoModelCRUD';

export interface TaskDocument extends Task, Document { }

export const TaskSchema = new Schema<TaskDocument>(
  {
    user_id: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
  },
  { versionKey: false },
);

class TaskModel extends MongoModelCRUD<Task> {
  constructor(model = createModel('Tasks', TaskSchema)) {
    super(model);
  }
}

export default TaskModel;
