import { readFileSync } from 'fs';
import { sign, verify, SignOptions } from 'jsonwebtoken';
import { ITokenData } from '../interfaces';

const jwtOptions: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

const signToken = (data: ITokenData) => sign({ ...data }, SECRET, jwtOptions);

const verifyToken = (token:string) => verify(token, SECRET, jwtOptions);

export { signToken, verifyToken };
