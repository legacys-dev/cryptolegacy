import {job} from '@orion-js/jobs'
import Files from 'app/collections/Files'
import isEmpty from 'lodash/isEmpty'
import {deleteArchive} from 'app/helpers/awsS3'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60 * 20,
  async run(params) {
    const files = await Files.find({
      storage: 'glacier',
      's3Data.status': 'uploaded',
      's3Data.deletedFromS3': false,
      'glacierData.status': 'uploaded'
    })
      .sort({createdAt: 1})
      .toArray()

    if (isEmpty(files)) return

    for (const file of files) {
      let hasError
      try {
        await deleteArchive({key: file.s3Data.key, bucket: file.s3Data.bucket})
      } catch (error) {
        hasError = !!error
        console.log(error)
      }

      if (hasError) continue

      await file.update({$set: {'s3Data.deletedFromS3': true, 's3Data.updatedAt': new Date()}})
    }
  }
})
