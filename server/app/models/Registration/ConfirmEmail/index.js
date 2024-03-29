import { Model } from '@orion-js/app'

export default new Model({
  name: 'ConfirmEmail',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
