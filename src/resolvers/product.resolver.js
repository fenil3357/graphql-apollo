import { createProduct } from "../db/database_functions/product/createProduct.js";
import { deleteProduct } from "../db/database_functions/product/deleteProduct.js";
import { updateProduct } from "../db/database_functions/product/updateProduct.js";
import { getProducts } from "../db/database_functions/product/getProducts.js";
import { getProduct } from "../db/database_functions/product/getProduct.js";
import { CustomError, customGraphqlErrorCodes, httpStatusCodes } from "../constants/constants.js";

export const productResolvers = {
  Query: {
    async getProduct(_, { _id }) {
      try {
        const product = await getProduct(_id);
        return product;
      } catch (error) {
        throw error;
      }
    },
    async getProducts() {
      try {
        const products = await getProducts();
        return products;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    async createProduct(_, { name, price, user }, { userId }) {
      try {
        if (!userId) throw new CustomError(httpStatusCodes['Unauthorized'], customGraphqlErrorCodes['UNAUTHORIZED'], 'Unauthorized');

        if (userId !== user) throw new CustomError(httpStatusCodes['Forbidden'], customGraphqlErrorCodes['FORBIDDEN'], 'Forbidden');

        const product = await createProduct({ name, price, user })
        return product;
      } catch (error) {
        throw error;
      }
    },
    async updateProduct(_, { _id, ...dataToUpdate }, { userId }) {
      try {
        if (!userId) throw new CustomError(httpStatusCodes['Unauthorized'], customGraphqlErrorCodes['UNAUTHORIZED'], 'Unauthorized');
        const product = await getProduct(_id);

        if (product?.user?.toString() !== userId) throw new CustomError(httpStatusCodes['Forbidden'], customGraphqlErrorCodes['FORBIDDEN'], 'Forbidden');

        const updatedProduct = await updateProduct(_id, dataToUpdate);
        return updatedProduct;
      } catch (error) {
        throw error;
      }
    },
    async deleteProduct(_, { _id }, { userId }) {
      try {
        if (!userId) throw new CustomError(httpStatusCodes['Unauthorized'], customGraphqlErrorCodes['UNAUTHORIZED'], 'Unauthorized');

        const product = await getProduct(_id);

        if (product?.user?.toString() !== userId) throw new CustomError(httpStatusCodes['Forbidden'], customGraphqlErrorCodes['FORBIDDEN'], 'Forbidden');

        await deleteProduct(_id);
        return "Product deleted successfully!"
      } catch (error) {
        throw error;
      }
    }
  }
}