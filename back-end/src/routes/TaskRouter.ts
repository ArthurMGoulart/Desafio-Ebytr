import { Router } from 'express';
import { TaskController } from '../controllers';
import { validateJWT } from '../middlewares';
import validateUserCreated from '../middlewares/validateUserCreated';

class TaskRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: TaskController
  ) {
    this.router.get('/tasks', validateJWT, controller.read);
    this.router.get('/tasks/:id', validateJWT, validateUserCreated, controller.readOne);
    this.router.post('/tasks', validateJWT, controller.create);
    this.router.put('/tasks/:id', validateJWT, validateUserCreated, controller.update);
    this.router.delete('/tasks/:id', validateJWT, validateUserCreated, controller.delete);
  }
}

export default TaskRouter;
