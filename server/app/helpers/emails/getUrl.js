export default function() {
  if (process.env.ORION_LOCAL) return 'http://localhost:3010'
  if (process.env.ORION_DEVELOPMENT) return 'https://dev.cryptolegacy.io/heritage'
  if (process.env.ORION_BETA) return 'https://beta.cryptolegacy.io'
  return ''
}
