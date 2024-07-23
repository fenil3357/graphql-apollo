import { ApolloServerErrorCode } from "@apollo/server/errors";
import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { userModel } from "../../models/user.model.js";

export const getUsers = async () => {
  try {
    const users = await userModel.find().populate('products').lean();
    return users;
  } catch (error) {
    throw new CustomError(error?.extensions?.httpStatusCode || httpStatusCodes['Internal Server Error'], error?.extensions?.code || ApolloServerErrorCode['INTERNAL_SERVER_ERROR'], error.message);
  }
}