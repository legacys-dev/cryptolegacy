import { route } from '@orion-js/app'
import { getCustomer } from 'app/helpers/qvo'
import Users from 'app/collections/Users'

route('/enroll/creditCard/:customerId', async function({
  params,
  query,
  pathname,
  request,
  headers,
  response,
  getBody
}) {
  const { customerId } = params

  try {
    const customer = await getCustomer(customerId)

    if (!customer || !customer.cards || !customer.cards.length) {
      throw new Error('Error creating card')
    }

    const user = await Users.findOne({ 'qvo.customerId': customerId })
    await user.update({ $set: { 'qvo.cardId': customer.cards[0].id } })
  } catch (error) {
    console.log({ error })
    return { error: 'Ocurrio un error inscribiendo la tarjeta' }
  }

  return 'Tarjeta inscrita correctamente, puedes cerrar esta ventana'
})
