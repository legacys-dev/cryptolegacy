import stripe from './stripe'

export default async function(user) {
  let customer
  try {
    customer = await stripe.customers.create({
      email: await user.email(),
      metadata: {
        userId: user._id
      }
    })
  } catch (error) {
    console.log(error)
  }

  await user.update({ $set: { stripeCustomerId: customer.id } })

  return customer.id
}
