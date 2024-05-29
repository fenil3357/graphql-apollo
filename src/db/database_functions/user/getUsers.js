import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { userModel } from "../../models/user.model.js";

export const getUsers = async () => {
  try {
    const users = await userModel.find().lean()
    return users;
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }
}