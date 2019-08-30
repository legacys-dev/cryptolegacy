import {resolver} from '@orion-js/app'
import {metaDataEncryptWithPassword as encrypt} from 'app/helpers/crypto'
import Activities from 'app/collections/Activities'
import Users from 'app/collections/Users'
import isEmpty from 'lodash/isEmpty'

export default resolver({
  params:{},
  returns: 'blackbox',
  async resolve(params,viewer) {
    const activities = await Activities.find({userId: viewer.userId}).toArray()

    if (isEmpty(activities)) return {items: null}

    const activitiesData = activities.map(activity => activity.actions())

    const itemToEncrypt = await Promise.all(activitiesData)
    const user = await Users.findOne({_id: viewer.userId})
    const cipherPassword = user.communicationPassword

    return {items: encrypt({itemToEncrypt, cipherPassword})}
  }
})
