import { resolver } from '@orion-js/app'
import mime from 'mime-types'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(file, params, viewer) {
    if (file.storage !== 'drive') return

    const { ORION_LOCAL, ORION_DEVELOPMENT, ORION_BETA } = process.env

    const fileId = file.driveData.driveId
    const { cloudName, type } = file

    const fieldType = mime.extension(type)

    const extension = `get-google-drive-file/${fileId}/${cloudName}/${fieldType}`

    const downloadUrl = ORION_LOCAL
      ? `http://localhost:3000/${extension}`
      : ORION_DEVELOPMENT
      ? `https://apidev.cryptolegacy.io/${extension}`
      : ORION_BETA
      ? `https://apibeta.cryptolegacy.io/${extension}`
      : 'prod'

    return downloadUrl
  }
})
