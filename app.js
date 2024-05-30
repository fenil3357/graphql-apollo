import { CustomError, httpStatusCodes } from './src/constants/constants.js'
import { errRes } from './src/helpers/sendResponse.js'
import { connectDB } from './src/config/connectDB.js'
import { ApolloServer } from '@apollo/server'
import { typeDefs } from './src/schemas/main.schema.js'
import { resolvers } from './src/resolvers/main.resolver.js'
import { startStandaloneServer } from '@apollo/server/standalone'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    return {
      message: error.message,
      code: error.extensions.code
    }
  }
})

async function startServer() {
  try {
    await connectDB();
    startStandaloneServer(server, {
      listen: { port: 3000 }
    })
      .then(({ url }) => {
        console.log(`🚀 Server running at ${url}`)
      })
  } catch (error) {
    console.log('Error', error);
  }
}

startServer();