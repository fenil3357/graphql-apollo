import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { productModel } from "../../models/product.model.js";

export const createProduct = async (data) => {
  try {
    const new_product = await productModel.create(data);

    if(!new_product) throw new CustomError(httpStatusCodes['Bad Request'], "Invalid data");

    return new_product;
  } catch (error) {
    throw new CustomError(error.extensions.code || httpStatusCodes['Bad Request'], error.message);
  }
}