import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { userModel } from "../../models/user.model.js";

export const updateUser = async (id, dataToUpdate) => {
  try {
    const user = await userModel.findOneAndUpdate({
      _id: id
    }, dataToUpdate, {
      new: true
    })

    if (!user) throw new CustomError(httpStatusCodes['Not Found'], 'User with given id does not exsits');

    return user;
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }
}