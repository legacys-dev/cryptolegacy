import {resolver} from '@orion-js/app'
import getDownloadUrl from 'app/helpers/awsS3/getDownloadUrl'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    const s3Params = {
      bucket: file.s3Data.bucket,
      key: file.s3Data.key
    }

    let fromS3
    let s3Error
    try {
      fromS3 = await getDownloadUrl(s3Params)
    } catch (error) {
      s3Error = !!error
      console.log(error)
    }

    if (s3Error) return
    console.log({fromS3})
    return fromS3
  }
})
