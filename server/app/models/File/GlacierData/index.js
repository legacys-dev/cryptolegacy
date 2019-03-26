import {Model} from '@orion-js/app'

export default new Model({
  name: 'Glacier_Data',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
