import {generateId} from '@orion-js/app'
import Users from 'app/collections/Users'
import {missedPassword as sendEmail} from 'app/helpers/emails'

export default async function resetPassword({email}, viewer) {
  const token = generateId(61)
  const local = process.env.ORION_LOCAL
  const beta = process.env.ORION_BETA

  const url = local
    ? 'http://localhost:3010/reset/'
    : beta
    ? 'https://beta.cryptolegacy.io/reset/'
    : 'production url'

  const userUrl = `${url}${token}`

  const user = await Users.findOne({'emails.address': email})
  const date = new Date()

  await user.update({$set: {'services.forgot': {token, date}}})

  const params = {
    email,
    userUrl,
    name: await user.name(),
    lastName: await user.lastName()
  }

  try {
    await sendEmail(params)
  } catch (e) {
    console.log('ERROR ENVIANDO MAILL')
  }

  return true
}
