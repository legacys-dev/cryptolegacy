import {setCorsOptions} from '@orion-js/app'
import {startGraphQL} from '@orion-js/graphql'
import resolvers from 'app/resolvers'
import subscriptions from 'app/subscriptions'

const useGraphiql = false // Activate Graphql IDE in browser
const origin = process.env.ORION_LOCAL
  ? '*'
  : process.env.ORION_DEVELOPMENT
  ? 'https://dev.cryptolegacy.io'
  : null

startGraphQL({
  resolvers,
  useGraphiql,
  subscriptions
})

setCorsOptions({
  origin,
  allowMethods: ['GET']
})
