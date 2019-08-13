import {resolver} from '@orion-js/app'
import EmergencyKits from 'app/collections/EmergencyKits'

export default resolver({
  params: {
    userId: {
      type: String
    }
  },
  returns: String,
  async resolve(params, viewer) {
    const {userId} = params
    let keyToDelete = await EmergencyKits.findOne({userId})
    const result = keyToDelete.remove();
    return {response : result}
  }
})
