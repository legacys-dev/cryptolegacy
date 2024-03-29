import {start} from '@orion-js/jobs'
import glacierSmallFilesUploader from './glacierSmallFilesUploader'
import glacierMediumFilesUploader from './glacierMediumFilesUploader'
import glacierBigFilesUploader from './glacierBigFilesUploader'
import glacierDeleteFromS3 from './glacierDeleteFromS3'
import b2SmallFilesUploader from './b2SmallFilesUploader'
import b2MediumFilesUploader from './b2MediumFilesUploader'
import b2BigFilesUploader from './b2BigFilesUploader'
import b2DeleteFromS3 from './b2DeleteFromS3'
import driveDeleteFromS3 from './driveDeleteFromS3'
import driveSmallFilesUploader from './driveSmallFilesUploader'
import glacierUpdatePendingDownloads from './glacierUpdatePendingDownloads'
import glacierUpdateDeletedJobs from './glacierUpdateDeletedJobs'
import removeFiles from './removeFiles'

start({
  glacierUpdateDeletedJobs,
  glacierUpdatePendingDownloads,
  b2DeleteFromS3,
  driveDeleteFromS3,
  b2BigFilesUploader,
  b2MediumFilesUploader,
  b2SmallFilesUploader,
  driveSmallFilesUploader,
  glacierDeleteFromS3,
  glacierBigFilesUploader,
  glacierMediumFilesUploader,
  glacierSmallFilesUploader,
  removeFiles
})
