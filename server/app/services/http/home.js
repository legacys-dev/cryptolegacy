import {route} from '@orion-js/app'
import {downloadFileById} from 'app/helpers/backblazeB2'

route('/asd/:userId', async function({params, query, pathname, request, headers, response}) {
  const fileId =
    '4_z14e678f110ddcea8689c0114_f102c21276d0b0f17_d20190502_m195357_c002_v0001123_t0033'
  const result = await downloadFileById({fileId})
  console.log({result})
  return result.toString('hex')
})
