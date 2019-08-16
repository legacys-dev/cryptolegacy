import {getData} from './connections'

export default async (customerId, cardId) => {
  try {
    return await getData(`/customers/${customerId}/cards/${cardId}`)
  } catch (e) {
    console.log('No se encontró la tarjeta')
    return null
  }
}
