import S3Data from './S3Data'
import GlacierData from './GlacierData'

export default {
  _id: {
    type: 'ID'
  },
  userId: {
    type: 'ID',
    private: true
  },
  s3Data: {
    type: S3Data,
    private: true
  },
  glacierData: {
    type: GlacierData,
    private: true,
    optional: true
  },
  createdAt: {
    type: Date
  }
}
