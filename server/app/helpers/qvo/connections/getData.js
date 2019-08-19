import axios from 'axios'
import getUrl from './getUrl'

export default async (route, data) => {
  const url = `${getUrl()}/${route}`
  const result = await axios.get({
    url,
    data,
    headers: {
      Authorization: `Bearer ${process.env.QVOAPITOKEN}`
    }
  })

  return result.data
}
