import {job} from '@orion-js/jobs'
import Files from 'app/collections/Files'
import isEmpty from 'lodash/isEmpty'
import {deleteArchive} from 'app/helpers/awsS3'

const time = process.env.ORION_LOCAL ? 1000 * 60 : 1000 * 60 * 30

export default job({
  type: 'recurrent',
  runEvery: time, // must be 30 minutes
  async run(params) {
    const files = await Files.find({
      status: 'active',
      storage: 'b2',
      's3Data.status': 'uploaded',
      's3Data.deletedFromS3': false,
      'b2Data.status': 'uploaded'
    })
      .sort({createdAt: 1})
      .toArray()

    if (isEmpty(files)) return

    for (const file of files) {
      deleteArchive({key: file.s3Data.key, bucket: file.s3Data.bucket}) // await not necessary
      file.update({$set: {'s3Data.deletedFromS3': true, 's3Data.updatedAt': new Date()}}) // await not necessary
    }
  }
})
