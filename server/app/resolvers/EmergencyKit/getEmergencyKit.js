import {resolver} from '@orion-js/app'
import EmergencyKits from 'app/collections/EmergencyKits'
import generatepdf from '../../helpers/pdf/generatePdf'
import moment from 'moment'



export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(params, viewer) {
    let key = await EmergencyKits.findOne({userId:viewer.userId})
    const fs = require('fs')
    const pdf = require('html-pdf')
    const user ={
      userName: 'Usuario prueba',
      userLastName: 'Apellido',
      userMasterKey: '5:MPIMSOY9-CBHN4AU9ZC-GXOTMM33:3',
      createdAt: moment()
    }
    const result = await new Promise((resolve, reject)=> {
      pdf.create(generatepdf(user), {}).toBuffer((err,buff) => {  
        if(err) reject(err)
        if(buff) resolve(buff.toString('hex'))
      })
    })
    return {key:key, data:result}
  }
})

