import { userResolvers } from "./user.resolver.js";
import { ProductResolvers } from "./product.resolver.js";

export const resolvers = {
  ...userResolvers,
  ...ProductResolvers
};