import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { userModel } from "../../models/user.model.js";

export const getUser = async (id) => {
  try {
    const user = await userModel.findById(id).lean();

    if (!user) throw new CustomError(httpStatusCodes['Not Found'], 'User with given id does not exists');

    return user;
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }
}