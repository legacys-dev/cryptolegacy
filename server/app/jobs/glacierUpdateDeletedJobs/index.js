import {job} from '@orion-js/jobs'
import DownloadRequests from 'app/collections/DownloadRequests'
import {DateTime} from 'luxon'
import moment from 'moment-timezone'
import isEmpty from 'lodash/isEmpty'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60,
  async run(params) {
    const limitTime = DateTime.local()
      .minus({minutes: 20})
      .toJSDate()

    const glacierDownloads = await DownloadRequests.find({
      status: 'completed',
      completionDate: {$lte: limitTime}
    }).toArray()

    if (isEmpty(glacierDownloads)) return

    for (const downloadRequest of glacierDownloads) {
      // console.log({downloadRequest})
      const timeLimit = moment(limitTime)
        .locale('es')
        .tz('America/Santiago')
        .format('LLLL')

      const completeDate = moment(downloadRequest.completionDate)
        .locale('es')
        .tz('America/Santiago')
        .format('LLLL')

      const completeDate2 = moment(downloadRequest.completionDate).format('LLLL')

      // console.log(timeLimit)
      console.log(completeDate)
      console.log(completeDate2)
      console.log(' ')
      console.log(' ')
      console.log(' ')
      console.log(moment(new Date()).format('LLLL'))
      console.log(
        moment(new Date())
          .tz('America/Santiago')
          .format('LLLL')
      )
    }

    // const three = moment(glacierDownloads.createdAt)
    //   .locale('es')
    //   .tz('America/Santiago')
    //   .format('LLLL')
    //
    // const four = moment(limitTime2)
    //   .locale('es')
    //   .tz('America/Santiago')
    //   .format('LLLL')

    // console.log(four)
    // console.log(three)
  }
})
