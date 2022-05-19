import { Router } from 'express';
import Controller from '../controllers/Controller';

abstract class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  abstract addRoute(controller: Controller<T>, route: string) : void
  
}

export default CustomRouter;
