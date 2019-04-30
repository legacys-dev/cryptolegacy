import getCustomerId from './getCustomerId'
import stripe from './stripe'

export default async function(user, data) {
  const customerId = await getCustomerId(user)

  let charge
  try {
    charge = await stripe.charges.create({
      customer: customerId,
      ...data
    })
  } catch (error) {
    console.log(error)
  }

  return charge
}
