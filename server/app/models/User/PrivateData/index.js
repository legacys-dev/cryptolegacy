import {Model} from '@orion-js/app'

export default new Model({
  name: 'PrivateData',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
