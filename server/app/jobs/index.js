import {start} from '@orion-js/jobs'
import smallFilesUploader from './smallFilesUploader'
import mediumFilesUploader from './mediumFilesUploader'
import bigFilesUploader from './bigFilesUploader'

start({
  bigFilesUploader,
  mediumFilesUploader,
  smallFilesUploader
})
