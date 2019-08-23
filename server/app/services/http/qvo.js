import {route} from '@orion-js/app'
import generatepdf from '../../helpers/pdf/generatePdf'
import moment from 'moment'

route('/responseQvo', async function({params, query, pathname, request, headers, response, getBody}) {
  const uid = query.uid;
  
  return 'QVO response'
})

