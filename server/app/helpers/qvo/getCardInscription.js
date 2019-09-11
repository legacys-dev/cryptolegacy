import { getData } from './connections'

export default async (customerId, inscriptionId) => {
  try {
    return await getData(`/customers/${customerId}/cards/inscriptions/${inscriptionId}`)
  } catch (e) {
    console.log('No se encontró la inscripción de la tarjeta')
    return null
  }
}
