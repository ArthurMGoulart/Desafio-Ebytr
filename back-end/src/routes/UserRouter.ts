import { Router } from 'express';
import { UserController } from "../controllers";

class UserRouter {

  public router: Router;

  constructor() {
    this.router = Router();
  }

  addRoute(controller: UserController): void {
    {
      this.router.post('/signUp', controller.signUp);
      this.router.post('/login', controller.login);
    }
  }
  
}

export default UserRouter;
