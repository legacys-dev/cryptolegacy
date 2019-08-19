import {deleteData} from './connections'

export default async (customerId, cardId) => {
  try {
    await deleteData(`customers/${customerId}/cards/${cardId}`)
  } catch (e) {
    console.log('error')
    return null
  }

  return true
}
