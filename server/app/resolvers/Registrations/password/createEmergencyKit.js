import {generateId} from '@orion-js/app'
import {cipherEncrypt} from 'app/helpers/crypto'
import EmergencyKits from 'app/collections/EmergencyKits'

export default async function({userMasterHash, userId, email}) {
  const _id = generateId(71)
  const key = generateId(32)

  const toEncrypt = {userId, userMasterHash, email}
  const encrypted = cipherEncrypt(JSON.stringify(toEncrypt), key, null, 'meta-data')

  await EmergencyKits.insert({_id, key, userId, encrypted})

  return {emergencyKitId: _id, emergencyKey: key}
}
