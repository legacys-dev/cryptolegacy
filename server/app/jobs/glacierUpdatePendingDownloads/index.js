import {job} from '@orion-js/jobs'
import {getJobInformation} from 'app/helpers/awsGlacier'
import DownloadRequests from 'app/collections/DownloadRequests'
import isEmpty from 'lodash/isEmpty'

const time = process.env.ORION_LOCAL ? 1000 * 60 : 1000 * 60 * 30

export default job({
  type: 'recurrent',
  runEvery: time, // Must be 30 minutes
  async run(params) {
    const glacierDownloads = await DownloadRequests.find({status: 'pending'}).toArray()

    if (isEmpty(glacierDownloads)) return

    for (const downloadRequest of glacierDownloads) {
      const downloadParams = {
        jobId: downloadRequest.jobId,
        vaultName: downloadRequest.vaultName
      }

      let result
      try {
        result = await getJobInformation(downloadParams)
      } catch (error) {
        console.log(error)
        continue
      }

      const updateData = isEmpty(result)
        ? {
            status: 'jobDeleted',
            completionDate: null
          }
        : result && result.Completed
        ? {
            status: 'completed',
            completionDate: new Date(result.CompletionDate)
          }
        : null

      if (!updateData) continue

      downloadRequest.update({$set: updateData}) // await not necessary
    }
  }
})
