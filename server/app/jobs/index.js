import {start} from '@orion-js/jobs'
import glacierSmallFilesUploader from './glacierSmallFilesUploader'
import glacierMediumFilesUploader from './glacierMediumFilesUploader'
import glacierBigFilesUploader from './glacierBigFilesUploader'
import glacierDeleteFromS3 from './glacierDeleteFromS3'
import b2SmallFilesUploader from './b2SmallFilesUploader'
import b2MediumFilesUploader from './b2MediumFilesUploader'
import b2BigFilesUploader from './b2BigFilesUploader'
import b2DeleteFromS3 from './b2DeleteFromS3'

start({
  b2DeleteFromS3,
  b2BigFilesUploader,
  b2MediumFilesUploader,
  b2SmallFilesUploader,
  glacierDeleteFromS3,
  glacierBigFilesUploader,
  glacierMediumFilesUploader,
  glacierSmallFilesUploader
})
