import createCustomer from './createCustomer'

export default async function(user) {
  if (user.stripeCustomerId) return user.stripeCustomerId

  let customer
  try {
    customer = createCustomer(user)
  } catch (error) {
    console.log(error)
  }

  return customer
}
