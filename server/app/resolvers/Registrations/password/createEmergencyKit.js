import {generateId} from '@orion-js/app'
import {encryptMessage} from 'app/helpers/openPgp'
import EmergencyKits from 'app/collections/EmergencyKits'

export default async function({userMasterKey, userId, email, userMessageKeys}) {
  const _id = generateId(201)
  const textToEncrypt = {userId, userMasterKey, email}
  const {publicKey} = userMessageKeys

  const encrypted = await encryptMessage({publicKey, textToEncrypt})

  await EmergencyKits.insert({_id, userId, encrypted})

  return {emergencyKitId: _id}
}
