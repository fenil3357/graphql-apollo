import gql from "graphql-tag"

export const productSchema = gql`
type Product {
  _id: String!
  name: String!
  price: Float!
  user: String!
}

type Query {
  getProduct(_id: String!): Product!
  getProducts: [Product!]!
}

type Mutation {
  createProduct(name: String!, price: Float!, user: String!): Product!
  updateProduct(_id: String!, name: String, price: Float): Product!
  deleteProduct(_id: String) : String
}
`;