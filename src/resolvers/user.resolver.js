import bcrypt from 'bcryptjs'
import { createUser } from "../db/database_functions/user/createUser.js";
import { deleteUser } from "../db/database_functions/user/deleteUser.js";
import { getUser } from "../db/database_functions/user/getUser.js";
import { getUsers } from "../db/database_functions/user/getUsers.js";
import { updateUser } from "../db/database_functions/user/updateUser.js";
import { CustomError, customGraphqlErrorCodes, httpStatusCodes } from '../constants/constants.js';
import { generateToken } from '../utils/jwt/jwt.utils.js';

export const userResolvers = {
  Query: {
    getUser: async (_, { _id }) => {
      try {
        const user = await getUser({ _id });
        return user;
      } catch (error) {
        throw error;
      }
    },
    getUsers: async (_, { userId }) => {
      try {
        const users = await getUsers();
        return users;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      try {
        const user = await createUser({ name, email, password });
        return user;
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (_, { _id, ...dataToUpdate }, { userId }) => {
      try {
        if (!userId) throw new CustomError(httpStatusCodes['Unauthorized'], customGraphqlErrorCodes['UNAUTHORIZED'], 'Unauthorized');

        if (userId !== _id) throw new CustomError(httpStatusCodes['Forbidden'], customGraphqlErrorCodes['FORBIDDEN'], 'Forbidden');

        const user = await updateUser(_id, dataToUpdate);
        return user;
      } catch (error) {
        throw error;
      }
    },
    deleteUser: async (_, { _id }, { userId }) => {
      try {
        if (!userId) throw new CustomError(httpStatusCodes['Unauthorized'], customGraphqlErrorCodes['UNAUTHORIZED'], 'Unauthorized');

        if (userId !== _id) throw new CustomError(httpStatusCodes['Forbidden'], customGraphqlErrorCodes['FORBIDDEN'], 'Forbidden');

        const user = await deleteUser(_id);
        return "User deleted successfully!";
      } catch (error) {
        throw error;
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await getUser({ email });

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) throw new CustomError(httpStatusCodes['Unauthorized'], customGraphqlErrorCodes['UNAUTHORIZED'], 'Invalid password');

        const token = generateToken(user._id);
        delete user.password;

        return {
          user,
          token,
          success: true,
          message: 'Login successful!'
        }
      } catch (error) {
        throw error;
      }
    }
  },
};
