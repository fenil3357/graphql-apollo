import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { productModel } from "../../models/product.model.js";

export const updateProduct = async (id, dataToUpdate) => {
  try {
    const product = await productModel.findOneAndUpdate({
      _id: id
    }, dataToUpdate, {
      new: true
    })

    if(!product) throw new CustomError(httpStatusCodes['Not Found'], 'Product with given id does not exists');

    return product;
  } catch (error) {
    throw new CustomError(error.extensions.code, error.message);
  }
}