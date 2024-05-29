import { buildSchema } from 'graphql'

export const userSchema = buildSchema(`
type User {
  _id: String!
  name: String!
  email: String!
}

type Query {
  getUser(_id: String!): User
  getUsers: [User]
}

type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(_id: String!, name: String, email: String): User!
  deleteUser(_id: String!) : User
}
`)