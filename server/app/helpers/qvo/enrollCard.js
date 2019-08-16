import {postData} from './connections'

export default async (customerId, callbackUrl) => {
  try {
    return await postData(`customers/${customerId}/cards/inscriptions`, {
      return_url: 'http://a28abfaf.ngrok.io/enroll'
    })
  } catch (e) {
    console.log('error')
    return null
  }
}
