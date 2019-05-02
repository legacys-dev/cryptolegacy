import {job} from '@orion-js/jobs'
import isEmpty from 'lodash/isEmpty'
import {DateTime} from 'luxon'
import EmergencyKits from 'app/collections/EmergencyKits'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60,
  async run(params) {
    const limitTime = DateTime.local()
      .minus({minutes: 30})
      .toJSDate()

    const kits = await EmergencyKits.find({createdAt: {$lt: limitTime}}).toArray()

    if (isEmpty(kits)) return

    for (const kit of kits) {
      await EmergencyKits.remove({_id: kit._id})
    }

    console.log('done')
  }
})
