import { NextFunction, Request, Response } from 'express';
import StatusCode from '../enums';
import { TaskService } from '../services';

const validateUserCreated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskService = new TaskService();
    const { id } = req.params;
    const task = await taskService.readOne(id);
    if (!task) return res.status(StatusCode.NOT_FOUND).json({ error: 'Task not found' });
    const { user_id } = task;
    const { id: userId } = res.locals.tokenData;
    if (userId !== user_id) return res.status(StatusCode.UNAUTHORIZED).json({ error: 'Not the user who created'});
    next();
  } catch (err) {
    const { message } = err as Error;
    return res.status(StatusCode.UNAUTHORIZED).json({ error: message });
  }
};

export default validateUserCreated;
