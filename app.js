import { CustomError, httpStatusCodes } from './src/constants/constants.js'
import { errRes } from './src/helpers/sendResponse.js'
import { connectDB } from './src/config/connectDB.js'
import { ApolloServer } from '@apollo/server'
import { typeDefs } from './src/schemas/main.schema.js'
import { resolvers } from './src/resolvers/main.resolver.js'

const server = new ApolloServer({
  typeDefs,
  resolvers
})