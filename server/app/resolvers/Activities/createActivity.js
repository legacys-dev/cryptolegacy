import { resolver } from '@orion-js/app'
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
    },
    newVaultName: {
      type: String,
      optional: true
    },
    status: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  async resolve(params, viewer) {
    if (!viewer.userId) throw new Error('User is not loged in')

    const { activityType, actionType, fileName, vaultName, newVaultName, status } = params

    const insertParams = {
      userId: viewer.userId,
      activityType,
      data: {
        action: actionType,
        fileName,
        vaultName,
        newVaultName
      },
      status,
      createdAt: new Date()
    }

    const activityId = await Activities.insert(insertParams)

    return activityId
  }
})
