import {resolver} from '@orion-js/app'
import getDownloadUrl from 'app/helpers/backblazeB2/getDownloadUrl'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    const b2Params = {
      bucketId: file.b2Data.bucketId,
      fileName: file.s3Data.name
    }

    let fromB2
    let b2Error
    try {
      fromB2 = await getDownloadUrl(b2Params)
    } catch (error) {
      b2Error = !!error
      console.log(error)
    }

    if (b2Error) return
    console.log({fromB2})

    return fromB2
  }
})
