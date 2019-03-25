import {resolver} from '@orion-js/app'
import downloadElement from 'app/helpers/awsS3/downloadElement'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(file, params, viewer) {
    const {key, bucket} = file.s3Data
    let fromS3, s3Error

    try {
      fromS3 = await downloadElement({key, bucket})
    } catch (error) {
      s3Error = !!error
      console.log(error)
    }

    if (s3Error) return {status: 'not available'}

    return {
      status: 'available',
      type: await file.getType(),
      body: fromS3.Body.toString('hex')
    }
  }
})
