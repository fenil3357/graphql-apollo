import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { userModel } from "../../models/user.model.js";

export const deleteUser = async (id) => {
  try {
    const user = await userModel.findOneAndDelete({
      _id: id
    });

    if (!user) throw new CustomError(httpStatusCodes['Not Found'], 'User with given id does not exists');
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }
}