import { resolver } from '@orion-js/app'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(file, params, viewer) {
    if (file.storage !== 'drive') return

    const fileId = file.driveData.driveId

    const downloadUrl = 'https://drive.google.com/uc?export=download&id=' + fileId

    return downloadUrl
  }
})
