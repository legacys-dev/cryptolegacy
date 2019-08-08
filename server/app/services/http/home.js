import {route} from '@orion-js/app'
import generatepdf from '../../helpers/pdf/generatePdf'
route('/', async function({params, query, pathname, request, headers, response, getBody}) {
  return 'hello world'
})

route('/generatepdf', async function({params, query, pathname, request, headers, response, getBody}) {
  const pdf = require('html-pdf');
  console.log("Soy el generador de pdf")
  pdf.create(generatepdf(), {}).toFile('tmp/rezultati.pdf', (err,res) => {
    if(err) {
        return console.log('error');
    }
    console.log(res)
    });
})


