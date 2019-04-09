import {Model} from '@orion-js/app'

export default new Model({
  name: 'PersonalVault',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
