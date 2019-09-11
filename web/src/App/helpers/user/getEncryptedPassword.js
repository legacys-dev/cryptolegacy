export default () => {
  const { encryptedPassword } = window.localStorage
  if (!encryptedPassword) return
  return encryptedPassword
}
