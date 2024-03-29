import { Model } from '@orion-js/app'

export default new Model({
  name: 'Vault',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
