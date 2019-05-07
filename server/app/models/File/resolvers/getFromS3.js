import {resolver} from '@orion-js/app'
import {getDownloadUrl, getHeadersElement} from 'app/helpers/awsS3'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    const s3Params = {
      bucket: file.s3Data.bucket,
      key: file.s3Data.key
    }

    let headerError
    try {
      await getHeadersElement(s3Params)
    } catch (error) {
      headerError = !!error
    }

    if (headerError) return

    let s3DownloadUrl
    let s3Error
    try {
      s3DownloadUrl = await getDownloadUrl(s3Params)
    } catch (error) {
      s3Error = !!error
    }

    if (s3Error) return

    return s3DownloadUrl
  }
})
