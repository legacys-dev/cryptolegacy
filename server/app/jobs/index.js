import {start} from '@orion-js/jobs'
import smallFilesUploader from './smallFilesUploader'
import mediumFilesUploader from './mediumFilesUploader'
import bigFilesUploader from './bigFilesUploader'
import deleteDataFromS3 from './deleteDataFromS3'

start({
  // deleteDataFromS3,
  // bigFilesUploader,
  // mediumFilesUploader,
  // smallFilesUploader
})
