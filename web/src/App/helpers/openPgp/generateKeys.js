import * as openpgp from 'openpgp'

export default async function({passphrase}) {
  if (!passphrase) throw new Error('Invalid passphrase')
  if (typeof passphrase !== 'string') throw new Error('Invalid passphrase type')
  if (passphrase.length < 21) throw new Error('Invalid passphrase length')

  const keyOptions = {
    numBits: 2048,
    userIds: [{id: passphrase, date: new Date()}],
    passphrase
  }

  const secretKeys = await new Promise(resolve => {
    openpgp.generateKey(keyOptions).then(key => {
      if (key) {
        const privateKey = key.privateKeyArmored
        const publicKey = key.publicKeyArmored
        resolve({privateKey, publicKey})
      }
    })

    return secretKeys
  })
}
