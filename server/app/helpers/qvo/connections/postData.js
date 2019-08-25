import axios from 'axios'
import getUrl from './getUrl'

export default async (route, data) => {
  const url = `${getUrl()}/${route}`

  const result = await axios({
    method: 'post',
    url,
    data,
    headers: {
      Authorization: `Bearer ${process.env.QVO_API_TOKEN}`
    }
  })

  return result.data
}
