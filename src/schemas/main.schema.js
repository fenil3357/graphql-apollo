import { userSchema } from "./user.schema.js";
import { productSchema } from "./product.schema.js";
import { mergeTypeDefs } from "@graphql-tools/merge";

export const typeDefs = mergeTypeDefs([userSchema, productSchema])