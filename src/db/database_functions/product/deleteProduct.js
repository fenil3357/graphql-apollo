import { ApolloServerErrorCode } from "@apollo/server/errors";
import { CustomError, customGraphqlErrorCodes, httpStatusCodes } from "../../../constants/constants.js";
import { productModel } from "../../models/product.model.js";


export const deleteProduct = async (id) => {
  try {
    const product = await productModel.findOneAndDelete({
      _id: id
    });

    if(!product) throw new CustomError(httpStatusCodes['Not Found'], customGraphqlErrorCodes['RESOURCE_NOT_FOUND'],'Product with given id does not exists');
  } catch (error) {
    throw new CustomError(error?.extensions?.httpStatusCode || httpStatusCodes['Bad Request'], error?.extensions?.code || ApolloServerErrorCode['BAD_REQUEST'],error.message);
  }
}