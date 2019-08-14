import {route} from '@orion-js/app'
import generatepdf from '../../helpers/pdf/generatePdf'
import moment from 'moment'
route('/', async function({params, query, pathname, request, headers, response, getBody}) {
  return 'hello world'
})
