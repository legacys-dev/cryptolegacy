import { Model } from '@orion-js/app'

export default new Model({
  name: 'Activitydata',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
