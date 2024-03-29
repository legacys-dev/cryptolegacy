import { Model } from '@orion-js/app'

export default new Model({
  name: 'Qvo',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
