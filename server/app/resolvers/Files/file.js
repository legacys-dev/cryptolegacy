import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'
import File from 'app/models/File'

export default resolver({
  params: {
    fileId: {
      type: 'ID'
    }
  },
  returns: File,
  async resolve({fileId}, viewer) {
    return await Files.findOne(fileId)
  }
})
