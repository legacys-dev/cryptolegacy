import {resolver} from '@orion-js/app'
import Activities from 'app/collections/Activities'

export default resolver({
  params: {
    activityType: {
      type: String
    },
    actionType: {
      type: String
    },
    fileName: {
      type: String,
      optional: true
    },
    vaultName: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  async resolve(params, viewer) {
    if (!viewer.userId) throw new Error('User is not loged in')

    const {activityType, actionType, fileName, vaultName} = params
    const insertParams = {
      userId: viewer.userId,
      activityType,
      data: {
        action: actionType,
        fileName,
        fileType: fileName && fileName.split()[1],
        vaultName
      },
      createdAt: new Date()
    }

    await Activities.insert(insertParams)
    return true
  }
})
