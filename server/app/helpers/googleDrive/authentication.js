import {google} from 'googleapis'

export default async () => {
  const scope = 'https://www.googleapis.com/auth/drive'

  const SERVICE_ACC_EMAIL = process.env.SERVICE_ACC_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')

  const auth = new google.auth.JWT(SERVICE_ACC_EMAIL, '', privateKey, scope)

  try {
    await auth.authorize()
  } catch (error) {
    console.log(error)
    return
  }

  return auth
}
