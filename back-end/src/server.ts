import App from './app';

import { TaskRouter, UserRouter } from './routes';

import {
  UserController,
  TaskController
} from './controllers';

const server = new App();

const userController = new UserController();

const userRouter = new UserRouter();

userRouter.addRoute(userController);

const taskController = new TaskController();

const taskRouter = new TaskRouter(); 

taskRouter.addRoute(taskController);

server.addRouter(userRouter.router);

server.addRouter(taskRouter.router);

export default server;
