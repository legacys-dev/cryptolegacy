import getUploadCredentials from './getUploadCredentials'
import completeS3Upload from './completeS3Upload'
import createS3Upload from './createS3Upload'
import files from './files'
import file from './file'
import deleteFile from './deleteFile'
import createDownload from './createDownload'
import restoreFile from './restoreFile'
import emptyTrash from './emptyTrash'
import finishDownload from './finishDownload'

export default {
  finishDownload,
  emptyTrash,
  restoreFile,
  createDownload,
  deleteFile,
  getUploadCredentials,
  completeS3Upload,
  createS3Upload,
  files,
  file
}
