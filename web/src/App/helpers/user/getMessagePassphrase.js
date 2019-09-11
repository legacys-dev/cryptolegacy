export default () => {
  const objectInformation = JSON.parse(window.localStorage.messages)
  if (!objectInformation) return
  return objectInformation.passphrase
}
