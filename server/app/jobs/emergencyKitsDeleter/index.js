import {job} from '@orion-js/jobs'
import isEmpty from 'lodash/isEmpty'
import {DateTime} from 'luxon'
import EmergencyKits from 'app/collections/EmergencyKits'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60 * 5, // must be 10 minutes
  async run(params) {
    const limitTime = DateTime.local()
      .minus({minutes: 5})
      .toJSDate()

    const kits = await EmergencyKits.find({createdAt: {$lt: limitTime}}).toArray()

    if (isEmpty(kits)) return

    for (const kit of kits) {
      kit.remove() // await not necessary
    }
  }
})
