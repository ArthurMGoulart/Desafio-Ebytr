import { Task } from '../interfaces';
export interface ModelTask {
  create: (task: Task) => Promise<Task>
  readAllByUser: (user_id: string) => Promise<Task[] | null>
  readOne: (id: string) => Promise<Task | null>
  update: (id: string, task: Task) => Promise<Task | null>
  delete: (id: string) => Promise<Task | null>
}
