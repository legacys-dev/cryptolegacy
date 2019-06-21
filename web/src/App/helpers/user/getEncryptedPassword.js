export default function() {
  const {encryptedPassword} = window.localStorage
  if (!encryptedPassword) return
  return encryptedPassword
}
