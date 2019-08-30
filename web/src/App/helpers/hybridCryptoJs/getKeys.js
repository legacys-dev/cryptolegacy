import { RSA } from 'App/helpers/hybridCryptoJs/functions'

export default () => {
  const rsa = new RSA({
    keySize: 2048,
    rsaStandard: 'RSA-OAEP' // RSA-OAEP - RSAES-PKCS1-V1_5
  })

  const keys = {}

  rsa.generateKeypair(function(keypair) {
    keys.privateKey = keypair.privateKey
    keys.publicKey = keypair.publicKey
  })

  return keys
}
