export default function() {
  const objectInformation = JSON.parse(window.localStorage.messages)
  return objectInformation.publicKey
}
