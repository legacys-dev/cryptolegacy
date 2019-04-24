import {resolver} from '@orion-js/app'
import getDownloadUrl from 'app/helpers/awsS3/getDownloadUrl'
import rp from 'request-promise'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    const s3Params = {
      bucket: file.s3Data.bucket,
      key: file.s3Data.key
    }

    let s3DownloadUrl
    let s3Error
    try {
      s3DownloadUrl = await getDownloadUrl(s3Params)
    } catch (error) {
      s3Error = !!error
      console.log(error)
    }

    if (s3Error) return

    let requestError
    try {
      await rp(s3DownloadUrl)
    } catch (error) {
      requestError = !!error
      console.log(error)
    }

    if (requestError) return

    return s3DownloadUrl
  }
})
