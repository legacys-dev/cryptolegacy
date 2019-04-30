import stripe from './stripe'

export default async function() {
  let allPayouts
  try {
    allPayouts = await stripe.payouts.list({
      limit: 20
    })
  } catch (error) {
    console.log(error)
  }

  return allPayouts
}
