import {setCorsOptions} from '@orion-js/app'
import {startGraphQL} from '@orion-js/graphql'
import resolvers from 'app/resolvers'
import subscriptions from 'app/subscriptions'

// Activate Graphql IDE in browser
let useGraphiql = false

startGraphQL({
  resolvers,
  useGraphiql,
  subscriptions
})

setCorsOptions({
  origin: '*',
  allowMethods: ['GET']
})
