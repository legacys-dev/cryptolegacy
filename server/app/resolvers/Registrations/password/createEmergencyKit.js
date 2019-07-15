import {generateId} from '@orion-js/app'
import {publicEncrypt as encryptMessage} from 'app/helpers/crypto'
import EmergencyKits from 'app/collections/EmergencyKits'

export default async function({userMasterKey, userId, email, userMessageKeys}) {
  const _id = generateId(201)
  const toEncrypt = {userId, userMasterKey, email}
  const {publicKey} = userMessageKeys

  const encrypted = await encryptMessage({publicKey, toEncrypt})

  await EmergencyKits.insert({_id, userId, encrypted})

  return {emergencyKitId: _id}
}
