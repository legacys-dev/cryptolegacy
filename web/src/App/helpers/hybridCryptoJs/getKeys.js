import {RSA} from 'App/helpers/hybridCryptoJs/functions'

export default function() {
  const BB = new RSA({
    keySize: 4096,
    rsaStandard: 'RSA-OAEP' // RSA-OAEP - RSAES-PKCS1-V1_5
  })

  const keys = {}

  BB.generateKeypair(function(keypair) {
    keys.publicKey = keypair.publicKey
    keys.privateKey = keypair.privateKey
  }, 1024)

  return keys
}
