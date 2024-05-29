import { buildSchema } from 'graphql'

export const userSchema = buildSchema(`
type Product {
  _id: String!
  name: String!
  price: Number!
}

type Query {
  getProduct(_id: String!): Product
  getProducts: [Product]
  getUserProducts(_id: String!): [Product]
}

type Mutation {
  createProduct(name: String!, price: Number!): Product!
  updateProduct(_id: String!, name: String, price: Number): Product!
  deleteProduct(_id: String!) : Product
}
`)