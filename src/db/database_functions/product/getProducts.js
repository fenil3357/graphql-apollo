import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { productModel } from "../../models/product.model.js";

export const getProducts = async () => {
  try {
    const products = await productModel.find().lean();
    return products;
  } catch (error) {
    throw new CustomError(error.extensions.code, error.message);
  }
}
