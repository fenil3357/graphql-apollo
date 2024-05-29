import { userSchema } from "./product.schema.js";
import { productSchema } from "./product.schema.js";

export const typeDefs = `
  ${userSchema}
  ${productSchema}
`;