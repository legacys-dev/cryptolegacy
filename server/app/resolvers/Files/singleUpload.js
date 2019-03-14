import {resolver} from '@orion-js/app'
import uploadSigleFile from 'app/helpers/glacier/uploadSigleFile'

export default resolver({
  params: {},
  returns: Boolean,
  mutation: true,
  async resolve(params, viewer) {
    const uploadResponse = uploadSigleFile()
    console.log({uploadResponse})

    return true
  }
})
