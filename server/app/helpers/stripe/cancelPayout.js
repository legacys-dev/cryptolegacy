import stripe from './stripe'

export default async function(payoutId) {
  let cancelPay
  try {
    cancelPay = await stripe.payouts.cancel({
      payoutId
    })
  } catch (error) {
    console.log(error)
  }

  return cancelPay
}
