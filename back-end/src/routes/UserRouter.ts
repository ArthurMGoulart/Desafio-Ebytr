import Controller from "../controllers/Controller";
import { User } from "../interfaces";
import CustomRouter from "./CustomRouter";

class UserRouter extends CustomRouter<User> {

  constructor() {
    super();
  }

  addRoute(controller: Controller<User>, route: string = controller.route): void {
    {
      this.router.post(route, controller.signIn);
      this.router.post(route, controller.signUp);
    }
  }
  
}

export default UserRouter;
