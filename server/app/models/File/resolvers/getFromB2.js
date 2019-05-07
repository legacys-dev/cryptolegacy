import {resolver} from '@orion-js/app'
import {getDownloadUrl} from 'app/helpers/backblazeB2'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(file, params, viewer) {
    if (file.storage !== 'b2') return

    const b2Params = {
      bucketId: file.b2Data.bucketId,
      fileName: file.s3Data.name
    }

    let downloadData
    let b2Error
    try {
      downloadData = await getDownloadUrl(b2Params)
    } catch (error) {
      console.log(error)
      b2Error = !!error
    }

    if (b2Error) return

    const downloadUrl =
      downloadData.url +
      '/file' +
      '/' +
      process.env.B2_BUCKET_NAME +
      '/' +
      file.s3Data.name +
      '?Authorization=' +
      downloadData.authorizationToken

    return downloadUrl
  }
})
