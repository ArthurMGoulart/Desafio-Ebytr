import App from './app';

import CustomRouter from './routes/CustomRouter';

import {
  UserController,
  TaskController
} from './controllers';

import { User, Task } from './interfaces';

const server = new App();

const userController = new UserController();

const userRouter = new CustomRouter<User>();

userRouter.addRoute(userController);

const taskController = new TaskController();

const taskRouter = new CustomRouter<Task>(); 

taskRouter.addRoute(taskController);

server.addRouter(userRouter.router);

server.addRouter(taskRouter.router);

export default server;
