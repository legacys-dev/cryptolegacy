import * as openpgp from 'openpgp'
import { generateId } from '@orion-js/app'

export default async function() {
  const passphrase = generateId(51)
  const keyOptions = {
    numBits: 2048, // Take some seconds
    userIds: [{ id: passphrase, date: new Date() }],
    passphrase: passphrase
  }

  const secretKeys = await new Promise(resolve => {
    openpgp.generateKey(keyOptions).then(key => {
      if (key) {
        const privateKey = key.privateKeyArmored
        const publicKey = key.publicKeyArmored
        resolve({ privateKey, publicKey })
      }
    })
  })

  return {
    passphrase,
    ...secretKeys
  }
}
