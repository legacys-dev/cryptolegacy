import {Model} from '@orion-js/app'

export default new Model({
  name: 'Registration',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
