import { ApolloServerErrorCode } from "@apollo/server/errors";
import { CustomError, customGraphqlErrorCodes, httpStatusCodes } from "../../../constants/constants.js";
import { productModel } from "../../models/product.model.js";

export const updateProduct = async (id, dataToUpdate) => {
  try {
    const product = await productModel.findOneAndUpdate({
      _id: id
    }, dataToUpdate, {
      new: true
    })

    if(!product) throw new CustomError(httpStatusCodes['Not Found'], customGraphqlErrorCodes['RESOURCE_NOT_FOUND'],'Product with given id does not exists');

    return product;
  } catch (error) {
    throw new CustomError(error?.extensions?.httpStatusCode || httpStatusCodes['Bad Request'], error?.extensions?.code || ApolloServerErrorCode['BAD_REQUEST'],error.message);
  }
}