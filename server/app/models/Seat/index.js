import { Model } from '@orion-js/app'

export default new Model({
  name: 'Seat',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
