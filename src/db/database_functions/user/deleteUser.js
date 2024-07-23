import { ApolloServerErrorCode } from "@apollo/server/errors";
import { CustomError, customGraphqlErrorCodes, httpStatusCodes } from "../../../constants/constants.js";
import { userModel } from "../../models/user.model.js";

export const deleteUser = async (id) => {
  try {
    const user = await userModel.findOneAndDelete({
      _id: id
    });

    if (!user) throw new CustomError(httpStatusCodes['Not Found'], customGraphqlErrorCodes['RESOURCE_NOT_FOUND'],'User with given id does not exists');
  } catch (error) {
    throw new CustomError(error?.extensions?.httpStatusCode || httpStatusCodes['Bad Request'], error?.extensions?.code || ApolloServerErrorCode['BAD_REQUEST'], error.message);
  }
}