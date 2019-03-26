import {Model} from '@orion-js/app'

export default new Model({
  name: 'UploadS3Credentials',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
