import { createProduct } from "../db/database_functions/product/createProduct.js";
import { deleteProduct } from "../db/database_functions/product/deleteProduct.js";
import { updateProduct } from "../db/database_functions/product/updateProduct.js";
import { getProducts } from "../db/database_functions/product/getProducts.js";
import { getProduct } from "../db/database_functions/product/getProduct.js";

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
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    async createProduct(_, { name, price }) {
      try {
        const product = await createProduct({ name, price })
        return product;
      } catch (error) {
        throw error;
      }
    },
    async updateProduct(_, { _id, ...dataToUpdate }) {
      try {
        const product = await updateProduct(_id, dataToUpdate);
        return product;
      } catch (error) {
        throw error;
      }
    },
    async deleteProduct(_, { _id }) {
      try {
        await deleteProduct(_id);
        return {
          message: "Product deleted successfully!"
        }
      } catch (error) {
        throw error;
      }
    }
  }
}