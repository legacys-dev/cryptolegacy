import {Model} from '@orion-js/app'

export default new Model({
  name: 'MessageKeys',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
