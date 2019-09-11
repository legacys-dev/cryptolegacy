import { postData } from './connections'

export default async (customerId, callbackUrl) => {
  try {
    return await postData(`customers/${customerId}/cards/inscriptions`, {
      return_url: callbackUrl
    })
  } catch (e) {
    console.log('error')
    return null
  }
}
