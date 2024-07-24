import gql from "graphql-tag"

export const userSchema = gql`
type User {
  _id: String!
  name: String!
  email: String!
  password: String!
  products: [Product!]
}

type UserPayload {
  _id: String
  name: String
  email: String
  products: [Product]
}

type AuthPayload {
  success: Boolean
  message: String
  user: UserPayload
  token: String
}

type Query {
  getUser(_id: String!): User!
  getUsers: [User!]!
}

type Mutation {
  createUser(name: String!, email: String!, password: String!): UserPayload
  updateUser(_id: String!, name: String, email: String, password: String): UserPayload
  login(email: String!, password: String!): AuthPayload
  deleteUser(_id: String!): String
}
`;
