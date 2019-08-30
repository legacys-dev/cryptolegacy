import { Collection } from '@orion-js/app'
import DownloadRequest from 'app/models/DownloadRequest'

export default new Collection({
  name: 'glacier_download_requests',
  model: DownloadRequest,
  indexes: []
})
