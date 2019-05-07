import {job} from '@orion-js/jobs'
import {getJobInformation} from 'app/helpers/awsGlacier'
import DownloadRequests from 'app/collections/DownloadRequests'
import isEmpty from 'lodash/isEmpty'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60 * 30,
  async run(params) {
    const glacierDownloads = await DownloadRequests.find({status: 'pending'}).toArray()

    if (isEmpty(glacierDownloads)) return

    for (const downloadRequest of glacierDownloads) {
      const downloadParams = {
        jobId: downloadRequest.jobId,
        vaultName: downloadRequest.vaultName
      }

      let result
      let errorOnRequest
      try {
        result = await getJobInformation(downloadParams)
      } catch (error) {
        errorOnRequest = !!error
        console.log(error)
      }

      if (errorOnRequest) continue

      const updateData = {
        status: 'completed',
        completionDate: new Date(result.CompletionDate)
      }

      if (result.Completed) {
        await downloadRequest.update({$set: updateData})
      }
    }
  }
})
