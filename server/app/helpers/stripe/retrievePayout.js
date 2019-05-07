import stripe from './stripe'

export default async function(payoutId) {
  let retrieve
  try {
    retrieve = await stripe.payouts.retrieve({
      payoutId
    })
  } catch (error) {
    console.log(error)
  }

  return retrieve
}
