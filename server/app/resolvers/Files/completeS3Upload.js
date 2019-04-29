import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'

export default resolver({
  params: {
    fileId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  filePermissions: true,
  async resolve({fileId}, viewer) {
    const file = await Files.findOne({userId: viewer.userId, _id: fileId})
    const status = file.storage.includes('b2')
      ? {'b2Data.status': 'pending'}
      : {'glacierData.status': 'pending'}

    const updateData = {
      ...{'s3Data.status': 'uploaded'},
      ...status
    }

    await file.update({$set: updateData})
    await file.updateVault()

    return true
  }
})
