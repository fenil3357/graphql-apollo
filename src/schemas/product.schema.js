import gql from "graphql-tag"

export const productSchema = gql`
type Product {
  _id: String!
  name: String!
  price: Float!
}

type Query {
  getProduct(_id: String!): Product!
  getProducts: [Product!]!
}

type Mutation {
  createProduct(name: String!, price: Float!): Product!
  updateProduct(_id: String!, name: String, price: Float): Product!
  deleteProduct(_id: String!): Product
}
`;