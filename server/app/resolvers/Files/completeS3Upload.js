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
  async resolve({fileId}, viewer) {
    const file = await Files.findOne({userId: viewer.userId, _id: fileId})
    await file.update({$set: {'s3Data.status': 'uploaded', 'glacierData.status': 'pending'}})
    return true
  }
})
