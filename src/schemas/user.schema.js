import gql from "graphql-tag"

export const userSchema = gql`
type User {
  _id: String!
  name: String!
  email: String!
  products: [Product!]
}

type Query {
  getUser(_id: String!): User!
  getUsers: [User!]!
}

type Mutation {
  createUser(name: String!, email: String!): User
  updateUser(_id: String!, name: String, email: String): User
  deleteUser(_id: String!): User
}
`;
