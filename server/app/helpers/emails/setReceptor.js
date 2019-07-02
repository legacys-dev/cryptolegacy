export default function(email) {
  const isLocal = process.env.ORION_LOCAL
  if (isLocal) return 'dev.cryptolegacy@gmail.com'
  return email
}
