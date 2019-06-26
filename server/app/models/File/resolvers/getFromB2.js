import {resolver} from '@orion-js/app'
import {getDownloadUrl} from 'app/helpers/backblazeB2'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(file, params, viewer) {
    if (file.storage !== 'b2') return

    const b2Params = {
      bucketId: file.b2Data.bucketId,
      fileName: file.cloudName
    }

    let downloadData
    try {
      downloadData = await getDownloadUrl(b2Params)
    } catch (error) {
      console.log(error)
      return
    }

    const downloadUrl =
      downloadData.url +
      '/file' +
      '/' +
      file.b2Data.bucketName +
      '/' +
      file.cloudName +
      '?Authorization=' +
      downloadData.authorizationToken

    return downloadUrl
  }
})
