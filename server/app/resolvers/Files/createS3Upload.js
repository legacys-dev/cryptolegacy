import {resolver} from '@orion-js/app'
import UploadS3Credentials from 'app/models/File/UploadS3Credentials'
import createUploadCredentials from 'app/helpers/awsS3/createUploadCredentials'
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
  returns: UploadS3Credentials,
  mutation: true,
  async resolve(params, viewer) {
    const result = await createUploadCredentials(params, viewer)
    const {key, bucket} = result

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
      ...result
    }
  }
})