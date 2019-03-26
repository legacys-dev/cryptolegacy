import {resolver} from '@orion-js/app'

export default resolver({
  returns: String,
  async resolve(file, viewer) {
    if (file.externalUrl) return file.externalUrl
    return `https://s3.amazonaws.com/${file.s3Data.bucket}/${file.s3Data.key.replace(/ /g, '%20')}`
  }
})
