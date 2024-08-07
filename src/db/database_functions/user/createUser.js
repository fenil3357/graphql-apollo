import bcrypt from 'bcryptjs'
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { CustomError, customGraphqlErrorCodes, httpStatusCodes } from "../../../constants/constants.js"
import { userModel } from "../../models/user.model.js"

export const createUser = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(data.password, salt);
        data.password = encryptedPassword;

        const new_user = await userModel.create(data);
        if (!new_user) {
            throw new CustomError(httpStatusCodes["Bad Request"], ApolloServerErrorCode['BAD_REQUEST'], "Invalid Data")
        }
        return new_user;
    }
    catch (error) {
        throw new CustomError(error?.extensions?.httpStatusCode || httpStatusCodes['Conflict'], error?.extensions?.code || customGraphqlErrorCodes['RESOURCE_CONFLICT'], error.message);
    }
}