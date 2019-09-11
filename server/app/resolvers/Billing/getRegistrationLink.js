import { resolver } from '@orion-js/app'
import Users from 'app/collections/Users'
import { enrollCard } from 'app/helpers/qvo'

export default resolver({
  params: {},
  returns: String,
  async resolve(params, viewer) {
    const local = process.env.ORION_LOCAL
    const beta = process.env.ORION_BETA
    const url = local
      ? 'http://localhost:3000'
      : beta
      ? 'https://beta.cryptolegacy.io'
      : 'production url'

    const user = await Users.findOne({ _id: viewer.userId })
    const result = await enrollCard(
      user.qvo.customerId,
      `${url}/enroll/creditCard/${user.qvo.customerId}`
    )

    return result.redirect_url
  }
})
