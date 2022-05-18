import App from './app';

import CustomRouter from './routes/CustomRouter';

import {
  UserController
} from './controllers';

import { User } from './interfaces';

const server = new App();

const userController = new UserController();

const userRouter = new CustomRouter<User>();

userRouter.addRoute(userController);

server.addRouter(userRouter.router);

export default server;
