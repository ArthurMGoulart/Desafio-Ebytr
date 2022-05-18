import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../auth/token';
import StatusCode from '../enums';

const tokenNotFoundError = {
  error: 'Token not found',
};

const tokenInvalidError = {
  error: 'Invalid token',
};

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(StatusCode.UNAUTHORIZED).json(tokenNotFoundError);

    const decoded = verifyToken(token) as JwtPayload;

    const { id, name, email } = decoded;

    res.locals.tokenData = { id, name, email };

    next();
  } catch (e) {
    return res.status(StatusCode.UNAUTHORIZED).json(tokenInvalidError);
  }
};

export default validateJWT;
