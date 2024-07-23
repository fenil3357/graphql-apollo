import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { connectDB } from './src/config/connectDB.js'
import { typeDefs } from './src/schemas/main.schema.js'
import { resolvers } from './src/resolvers/main.resolver.js'
import { httpStatusCodes } from './src/constants/constants.js'
import { ApolloServerErrorCode } from '@apollo/server/errors'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    return {
      message: error.message,
      code: error?.extensions?.code || ApolloServerErrorCode['INTERNAL_SERVER_ERROR'],
      httpStatusCode : error?.extensions?.httpStatusCode || httpStatusCodes['Internal Server Error']
    }
  },
  context: ({ req, res }) => {
    return { req, res };
  }
})

async function startServer() {
  try {
    await connectDB();
    startStandaloneServer(server, {
      listen: { port: process.env.PORT || 3000 }
    })
      .then(({ url }) => {
        console.log(`🚀 Server running at ${url}`)
      })
  } catch (error) {
    console.log('Error', error);
  }
}

startServer();