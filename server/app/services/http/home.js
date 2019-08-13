import {route} from '@orion-js/app'
import generatepdf from '../../helpers/pdf/generatePdf'
import moment from 'moment'
route('/', async function({params, query, pathname, request, headers, response, getBody}) {
  return 'hello world'
})

route('/generatepdf', async function({params, query, pathname, request, headers, response, getBody}) {
  const pdf = require('html-pdf');
  const fs = require('fs')
  console.log("Soy el generador de pdf")
  const user ={
    userName: 'Usuario prueba',
    userLastName: 'Apellido',
    userMasterKey: '5:MPIMSOY9-CBHN4AU9ZC-GXOTMM33:3',
    createdAt: moment()
  }
  
  let buff = await new Promise((resolve,reject) =>{
    pdf.create(generatepdf(user), {}).toFile('tmp/rezultati.pdf', (err,res) => {
      if(err) {
          return console.log('error');
      }
      var file = fs.readFileSync(res.filename)
  
      let buffa = Buffer(file).toString('base64')
      resolve(buffa)
      });
  })

  
})

