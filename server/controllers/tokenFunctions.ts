import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.prod.env'
      : process.env.NODE_ENV === 'test'
      ? '.test.env'
      : '.dev.env',
  ),
});

const SECRET = String(process.env.JWT_SECRET);

export const generateAccessToken = (data: object) => {
  return sign(data, SECRET, { expiresIn: '12h' });
};

export const tokenAuthentication = (req: Request) => {
  const token = req.headers.authorization;

  if (!token) return null;

  try {
    return verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
