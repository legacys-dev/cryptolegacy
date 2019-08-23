import axios from 'axios'
import getUrl from './getUrl'

export default async route => {
  const url = `${getUrl()}/${route}`
  const result = await axios({
    method: 'delete',
    url,
    headers: {
      Authorization: `Bearer ${process.env.QVO_API_TOKEN}`
    }
  })

  return result.data
}
