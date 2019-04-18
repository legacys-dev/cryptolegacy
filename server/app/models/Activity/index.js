import {Model} from '@orion-js/app'

export default new Model({
  name: 'Activity',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
