import { resolver } from '@orion-js/app'
import Files from 'app/collections/Files'
import Users from 'app/collections/Users'
import { publicEncrypt } from 'app/helpers/crypto'

export default resolver({
  params: {
    fileId: {
      type: 'ID'
    }
  },
  returns: 'blackbox',
  requireLogin: true,
  filePermissions: true,
  async resolve({ fileId }, viewer) {
    const user = await Users.findOne({ _id: viewer.userId })
    const file = await Files.findOne(fileId)

    const fileData = await file.data()
    const { publicKey } = user.messageKeys

    const encryptedData = publicEncrypt({ toEncrypt: fileData, publicKey })

    return {
      _id: file._id,
      data: encryptedData
    }
  }
})
