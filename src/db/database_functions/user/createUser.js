import { CustomError, httpStatusCodes } from "../../../constants/constants.js"
import { userModel } from "../../models/user.model.js"

export const createUser = async (data) => {
    try {
        const new_user = await userModel.create(data);
        if (!new_user) {
            throw new CustomError(httpStatusCodes["Bad Request"], "Invalid Data")
        }
        return new_user;
    }
    catch (error) {
        throw new CustomError(error?.extensions?.code || httpStatusCodes['Conflict'], error.message)
    }
}