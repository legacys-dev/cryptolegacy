import { resolver } from '@orion-js/app'
import { getDownloadUrl, getHeadersElement } from 'app/helpers/awsS3'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    const s3Params = {
      bucket: file.s3Data.bucket,
      key: file.s3Data.key
    }

    try {
      await getHeadersElement(s3Params)
    } catch (error) {
      console.log(error)
      return
    }

    let s3DownloadUrl
    try {
      s3DownloadUrl = await getDownloadUrl(s3Params)
    } catch (error) {
      return
    }

    return s3DownloadUrl
  }
})
