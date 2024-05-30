import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { productModel } from "../../models/product.model.js";


export const deleteProduct = async (id) => {
  try {
    const product = await productModel.findOneAndDelete({
      _id: id
    });

    if(!product) throw new CustomError(httpStatusCodes['Not Found'], 'Product with given id does not exists');
  } catch (error) {
    throw new CustomError(error.extensions.code, error.message);
  }
}