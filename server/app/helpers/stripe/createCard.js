import stripe from './stripe'
import getCustomerId from './getCustomerId'

export default async function(user, source) {
  const customerId = await getCustomerId(user)

  let card
  try {
    card = await stripe.customers.createSource(customerId, {
      source
    })
  } catch (error) {
    console.log(error)
  }

  return card
}
