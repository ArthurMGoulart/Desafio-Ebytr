import { readFileSync } from 'fs';
import { sign, verify, SignOptions } from 'jsonwebtoken';
import { ITokenData } from '../interfaces';

const jwtOptions: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const JWT_KEY = readFileSync(`${process.cwd()}/src/jwt.evaluation.key`);

const signToken = (data: ITokenData) => sign({ ...data }, JWT_KEY, jwtOptions);

const verifyToken = (token:string) => verify(token, JWT_KEY, jwtOptions);

export { signToken, verifyToken };
