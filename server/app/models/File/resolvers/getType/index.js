import {resolver} from '@orion-js/app'
import types from './types'

export default resolver({
  returns: String,
  async resolve(file, viewer) {
    const {type} = file.s3Data
    return types[type] ? types[type] : 'unknow'
  }
})
