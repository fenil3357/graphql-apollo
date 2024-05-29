import { userResolvers } from './user.resolver.js';
import { productResolvers } from './product.resolver.js';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...productResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
  },
};