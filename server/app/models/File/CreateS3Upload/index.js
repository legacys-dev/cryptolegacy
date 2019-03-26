import {Model} from '@orion-js/app'

export default new Model({
  name: 'Upload_S3_Credentials',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
