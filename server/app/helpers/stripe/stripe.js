import Stripe from 'stripe'

export default Stripe(
  process.env.ORION_DEV
    ? process.env.DEV_STRIPE
    : process.env.ORION_BETA
    ? process.env.DEV_STRIPE
    : process.env.PROD_STRIPE
)
