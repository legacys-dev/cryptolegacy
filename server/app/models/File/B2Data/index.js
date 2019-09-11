import { Model } from '@orion-js/app'

export default new Model({
  name: 'B2Data',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
