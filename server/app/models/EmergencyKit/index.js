import {Model} from '@orion-js/app'

export default new Model({
  name: 'EmergencyKit',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
