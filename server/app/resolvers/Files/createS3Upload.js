import {resolver, generateId} from '@orion-js/app'
import CreateS3Upload from 'app/models/File/CreateS3Upload'
import {AWSCredentials} from 'app/helpers/awsS3/credentials'
import Files from 'app/collections/Files'

export default resolver({
  params: {
    name: {
      type: String
    },
    size: {
      type: Number
    },
    type: {
      type: String
    }
  },
  returns: CreateS3Upload,
  mutation: true,
  checkSession: true,
  async resolve(params, viewer) {
    const {bucket, basePath} = AWSCredentials
    const key = `${basePath}/${generateId(151)}`

    const s3Data = {
      key,
      bucket,
      name: params.name,
      type: params.type,
      size: params.size,
      status: 'uploading',
      updatedAt: new Date()
    }

    const fileId = await Files.insert({
      s3Data,
      userId: viewer.userId,
      createdAt: new Date()
    })

    return {
      fileId,
      key
    }
  }
})
