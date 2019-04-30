import stripe from './stripe'

export default async function(payoutId, metadata) {
  let updatePay
  try {
    updatePay = await stripe.payouts.update({
      payoutId,
      metadata
    })
  } catch (error) {
    console.log(error)
  }

  return updatePay
}
