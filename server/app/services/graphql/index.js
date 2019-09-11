import { setCorsOptions } from '@orion-js/app'
import { startGraphQL } from '@orion-js/graphql'
import resolvers from 'app/resolvers'
import subscriptions from 'app/subscriptions'

const { ORION_LOCAL, ORION_DEVELOPMENT, ORION_BETA } = process.env

const useGraphiql = true // Activate Graphql IDE in browser
const origin = ORION_LOCAL
  ? '*'
  : ORION_DEVELOPMENT
  ? 'https://dev.cryptolegacy.io'
  : ORION_BETA
  ? 'https://beta.cryptolegacy.io'
  : 'prod'

startGraphQL({
  resolvers,
  useGraphiql,
  subscriptions
})

setCorsOptions({
  origin,
  allowMethods: ['GET']
})
