import { Model } from '@orion-js/app'

export default new Model({
  name: 'TransferData',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
