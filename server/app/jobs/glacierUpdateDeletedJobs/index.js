import {job} from '@orion-js/jobs'
import DownloadRequests from 'app/collections/DownloadRequests'
import {DateTime} from 'luxon'
import isEmpty from 'lodash/isEmpty'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60 * 30,
  async run(params) {
    const limitTime = DateTime.local()
      .minus({hours: 20})
      .toJSDate()

    const glacierDownloads = await DownloadRequests.find({
      status: 'completed',
      completionDate: {$lte: limitTime}
    }).toArray()

    if (isEmpty(glacierDownloads)) return

    for (const downloadRequest of glacierDownloads) {
      const updateData = {
        status: 'jobDeleted',
        completionDate: null
      }

      await downloadRequest.update({$set: updateData})
    }
  }
})
