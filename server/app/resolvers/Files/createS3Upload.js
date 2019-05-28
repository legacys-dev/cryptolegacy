import {resolver, generateId} from '@orion-js/app'
import CreateS3Upload from 'app/models/File/CreateS3Upload'
import {AWSCredentials} from 'app/helpers/awsS3/credentials'
import {presignedPost} from 'app/helpers/awsS3'
import {slugify} from 'app/helpers/parts'
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
    },
    storage: {
      type: String
    },
    vaultId: {
      type: 'ID'
    }
  },
  returns: CreateS3Upload,
  mutation: true,
  requireLogin: true,
  vaultOwner: true,
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
      vaultId: params.vaultId,
      searchSlug: slugify(params.name),
      createdAt: new Date(),
      storage: params.storage
    })

    const result = await presignedPost({key, bucket, params})

    return {
      fileId,
      key,
      ...result
    }
  }
})
