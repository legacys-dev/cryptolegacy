import createS3Upload from './createS3Upload'
import completeS3Upload from './completeS3Upload'
import files from './files'
import file from './file'
import glacierDownloadRequest from './glacierDownloadRequest'
import getObject from './getObject'
import getUploadCredentials from './getUploadCredentials'

export default {
  getUploadCredentials,
  glacierDownloadRequest,
  file,
  files,
  completeS3Upload,
  createS3Upload,
  getObject
}
