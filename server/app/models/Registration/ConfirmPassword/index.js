import {Model} from '@orion-js/app'

export default new Model({
  name: 'ConfirmPassword',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
