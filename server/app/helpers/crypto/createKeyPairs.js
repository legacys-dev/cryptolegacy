import crypto from 'crypto'

export default function() {
  return crypto.generateKeyPairSync(
    'rsa',
    {
      modulusLength: 4096, // the length of your key in bits
      publicKeyEncoding: {
        type: 'spki', // recommended to be 'spki' by the Node.js docs
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
        format: 'pem'
      }
    },
    (error, publicKey, privateKey) => {
      if (error) throw new Error('Error creating keys for user')
      return { publicKey, privateKey }
    }
  )
}
