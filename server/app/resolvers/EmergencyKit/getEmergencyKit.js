import {resolver} from '@orion-js/app'
import EmergencyKits from 'app/collections/EmergencyKits'
import generatepdf from '../../helpers/pdf/generatePdf'
import {privateDecrypt} from 'app/helpers/crypto'
import Users from 'app/collections/Users'
import moment from 'moment'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(params, viewer) {
    let key = await EmergencyKits.findOne({userId: viewer.userId})
    const user = await Users.findOne({_id: viewer.userId})
    const decryptedKey = privateDecrypt({
      toDecrypt: key.encrypted,
      privateKey: user.messageKeys.privateKey
    })
    const pdf = require('html-pdf')
    const userToPdf = {
      userName: user.profile.firstName,
      userLastName: user.profile.lastName,
      userMasterKey: decryptedKey.userMasterKey.original,
      createdAt: moment()
    }
    const result = await new Promise((resolve, reject) => {
      pdf.create(generatepdf(userToPdf), {type: 'pdf', timeout: '100000'}).toBuffer((err, buff) => {
        if (err) reject(err)
        if (buff) resolve(buff.toString('hex'))
      })
    })
    return {key: key.encrypted, data: result}
  }
})
