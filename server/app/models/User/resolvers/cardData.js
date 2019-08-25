import {resolver} from '@orion-js/app'
import {getCard} from 'app/helpers/qvo'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(user, params, viewer) {
    if (!user.qvo.cardId) return {}

    const {customerId, cardId} = user.qvo
    const card = await getCard(customerId, cardId)

    return {
      last4Digits: card.last_4_digits,
      type: card.card_type,
      createdAt: new Date(card.created_at)
    }
  }
})
