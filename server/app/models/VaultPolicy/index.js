import { Model } from '@orion-js/app'

export default new Model({
  name: 'VaultPolicy',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
