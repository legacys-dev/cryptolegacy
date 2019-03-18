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
    const file = await Files.findOne({_id: fileId, createdBy: viewer.userId})
    await file.update({$set: {'s3Data.status': 'uploaded'}})

    return true
  }
})
