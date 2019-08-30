import { PermissionsError } from '@orion-js/app'
import EmergencyKits from 'app/collections/EmergencyKits'
import isEmpty from 'lodash/isEmpty'

export default async function({ emergencyKitId, viewer }) {
  const emergencyKit = await EmergencyKits.findOne({ _id: emergencyKitId })

  if (isEmpty(emergencyKit)) throw new Error('emergency kit not found')

  if (!emergencyKit.userId) {
    throw new Error('emergency kit problem')
  }

  if (emergencyKit.userId !== viewer.userId) {
    throw new PermissionsError('unauthorized', { message: 'Unauthorized emergency kit access' })
  }
}
