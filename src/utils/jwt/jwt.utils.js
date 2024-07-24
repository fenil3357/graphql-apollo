import jwt from 'jsonwebtoken';
import { CustomError, customGraphqlErrorCodes, httpStatusCodes } from '../../constants/constants.js';
import { ApolloServerErrorCode } from '@apollo/server/errors';

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables');
}

export const generateToken = (userId) => {
  try {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1d' });
  } catch (error) {
    throw new CustomError(httpStatusCodes['Internal Server Error'], ApolloServerErrorCode['INTERNAL_SERVER_ERROR'], 'Failed to generate token');
  }
};

export const verifyToken = (token) => {
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    return verified;
  } catch (error) {
    throw new CustomError(httpStatusCodes['Unauthorized'], customGraphqlErrorCodes['UNAUTHORIZED'], 'Invalid or expired token');
  }
};