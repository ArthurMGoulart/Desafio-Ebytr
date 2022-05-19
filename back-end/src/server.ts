import App from './app';

import { CustomRouterCRUD, UserRouter } from './routes';

import {
  UserController,
  TaskController
} from './controllers';

import { Task } from './interfaces';

const server = new App();

const userController = new UserController();

const userRouter = new UserRouter();

userRouter.addRoute(userController);

const taskController = new TaskController();

const taskRouter = new CustomRouterCRUD<Task>(); 

taskRouter.addRoute(taskController);

server.addRouter(userRouter.router);

server.addRouter(taskRouter.router);

export default server;
