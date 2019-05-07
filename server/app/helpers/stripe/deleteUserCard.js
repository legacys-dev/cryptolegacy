import stripe from './stripe'
import getCustomerId from './getCustomerId'

export default async function(user, cardId) {
  const customerId = await getCustomerId(user)
  try {
    await stripe.customers.deleteSource(customerId, cardId)
  } catch (error) {
    console.log(error)
  }
}
