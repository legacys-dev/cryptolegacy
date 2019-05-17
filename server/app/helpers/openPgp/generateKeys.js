import * as openpgp from 'openpgp'
import {generateId} from '@orion-js/app'

export default async function({passphrase}) {
  const newPassphrase = passphrase || generateId(51)
  const keyOptions = {
    numBits: 2048,
    userIds: [{id: newPassphrase, date: new Date()}],
    passphrase: newPassphrase
  }

  const secretKeys = await new Promise(resolve => {
    openpgp.generateKey(keyOptions).then(key => {
      if (key) {
        const privateKey = key.privateKeyArmored
        const publicKey = key.publicKeyArmored
        resolve({privateKey, publicKey})
      }
    })

    return {
      passphrase: newPassphrase,
      ...secretKeys
    }
  })
}
