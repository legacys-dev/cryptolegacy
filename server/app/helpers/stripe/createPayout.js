import stripe from './stripe'

export default async function(amount, currency, destination, metadata) {
  let payout
  try {
    payout = await stripe.payouts.create.create({
      amount,
      currency,
      destination,
      metadata
    })
  } catch (error) {
    console.log(error)
  }

  return payout
}
