import {Model} from '@orion-js/app'

export default new Model({
  name: 'S3_Data',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
