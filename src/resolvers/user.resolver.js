import { createUser } from "../db/database_functions/user/createUser.js";
import { deleteUser } from "../db/database_functions/user/deleteUser.js";
import { getUser } from "../db/database_functions/user/getUser.js";
import { getUsers } from "../db/database_functions/user/getUsers.js";
import { updateUser } from "../db/database_functions/user/updateUser.js";

export const userResolvers = {
  async getUser({ _id }) {
    try {
      const user = await getUser(_id)
      return user;
    } catch (error) {
      throw error;
    }
  },
  async getUsers() {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      throw error;
    }
  },
  async createUser({ name, email }) {
    try {
      const user = await createUser({ name, email });
      return user;
    } catch (error) {
      throw error;
    }
  },
  async updateUser({ _id, ...dataToUpdate }) {
    try {
      const user = await updateUser(_id, dataToUpdate);
      return user;
    } catch (error) {
      throw error;
    }
  },
  async deleteUser({ _id }) {
    try {
      const user = await deleteUser(_id);
      return user;
    } catch (error) {
      throw error
    }
  }
}