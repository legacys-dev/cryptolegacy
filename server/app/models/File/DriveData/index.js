import { Model } from '@orion-js/app'

export default new Model({
  name: 'Drive_Data',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
