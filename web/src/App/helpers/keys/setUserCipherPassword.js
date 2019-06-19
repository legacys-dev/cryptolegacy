export default function(cipherPassword, userIv) {
  if (!cipherPassword || cipherPassword.length !== 32) return
  if (!userIv || userIv.length !== 16) return

  const cipherObject = {
    mainCipherPassword: cipherPassword,
    mainIv: userIv
  }

  window.localStorage.setItem('access', JSON.stringify(cipherObject))
}
