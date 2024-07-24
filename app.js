import { ApolloServer } from '@apollo/server'
import dotenv from 'dotenv'
import { startStandaloneServer } from '@apollo/server/standalone'
import { connectDB } from './src/config/connectDB.js'
import { typeDefs } from './src/schemas/main.schema.js'
import { resolvers } from './src/resolvers/main.resolver.js'
import { httpStatusCodes } from './src/constants/constants.js'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { verifyToken } from './src/utils/jwt/jwt.utils.js'

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    return {
      message: error.message,
      code: error?.extensions?.code || ApolloServerErrorCode['INTERNAL_SERVER_ERROR'],
      httpStatusCode: error?.extensions?.httpStatusCode || httpStatusCodes['Internal Server Error']
    }
  },
})

async function startServer() {
  try {
    await connectDB();
    startStandaloneServer(server, {
      listen: { port: process.env.PORT || 3000 },
      context: async ({ req }) => {
        const token = req.headers['authorization'];
        if (!token) {
          return '';
        }
        const decoded = await verifyToken(token);
        return { userId: decoded.userId };
      },
    })
      .then(({ url }) => {
        console.log(`🚀 Server running at ${url}`)
      })
  } catch (error) {
    console.log('Error', error);
  }
}

startServer();