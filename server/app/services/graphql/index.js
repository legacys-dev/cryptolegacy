import {setCorsOptions} from '@orion-js/app'
import {startGraphQL} from '@orion-js/graphql'
import resolvers from 'app/resolvers'

// Activate Graphql IDE in browser
let useGraphiql = null

startGraphQL({
  resolvers,
  useGraphiql
})

setCorsOptions({
  origin: '*'
})
