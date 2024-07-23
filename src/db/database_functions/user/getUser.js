import { ApolloServerErrorCode } from "@apollo/server/errors";
import { CustomError, customGraphqlErrorCodes, httpStatusCodes } from "../../../constants/constants.js";
import { userModel } from "../../models/user.model.js";

export const getUser = async (id) => {
  try {
    const user = await userModel.findById(id).populate('products').lean();

    if (!user) throw new CustomError(httpStatusCodes['Not Found'], customGraphqlErrorCodes['RESOURCE_NOT_FOUND'], 'User with given id does not exists');

    return user
  } catch (error) {
    throw new CustomError(error?.extensions?.httpStatusCode || httpStatusCodes['Bad Request'], error?.extensions?.code || ApolloServerErrorCode['BAD_REQUEST'], error.message);
  }
}