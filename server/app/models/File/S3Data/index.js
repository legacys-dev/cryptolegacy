import {Model} from '@orion-js/app'

export default new Model({
  name: 'S3',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
