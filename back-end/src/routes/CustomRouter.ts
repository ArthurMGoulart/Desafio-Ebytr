import { Router } from 'express';
import Controller from '../controllers/ControllerCRUD';
import { validateJWT } from '../middlewares';

class CustomRouterCRUD<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, validateJWT,controller.read);
    this.router.get(`${route}/:id`, validateJWT, controller.readOne);
    this.router.post(route, validateJWT, controller.create);
    this.router.put(`${route}/:id`, validateJWT, controller.update);
    this.router.delete(`${route}/:id`, validateJWT, controller.delete);
  }
}

export default CustomRouterCRUD;
