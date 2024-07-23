import { ApolloServerErrorCode } from "@apollo/server/errors";
import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { productModel } from "../../models/product.model.js";

export const createProduct = async (data) => {
  try {
    const new_product = await productModel.create(data);

    if(!new_product) throw new CustomError(httpStatusCodes['Bad Request'], ApolloServerErrorCode['BAD_REQUEST'],"Invalid data");

    return new_product;
  } catch (error) {
    throw new CustomError(error?.extensions?.httpStatusCode || httpStatusCodes['Internal Server Error'], error?.extensions?.code || ApolloServerErrorCode['INTERNAL_SERVER_ERROR'],error.message);
  }
}