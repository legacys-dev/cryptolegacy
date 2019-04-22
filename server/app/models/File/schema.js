import S3Data from './S3Data'
import GlacierData from './GlacierData'
import B2Data from './B2Data'

export default {
  _id: {
    type: 'ID'
  },
  userId: {
    type: 'ID',
    private: true
  },
  userVaultId: {
    type: 'ID',
    private: true
  },
  s3Data: {
    type: S3Data,
    private: true,
    optional: true
  },
  b2Data: {
    type: B2Data,
    private: true,
    optional: true
  },
  glacierData: {
    type: GlacierData,
    private: true,
    optional: true
  },
  storage: {
    type: String,
    allowedValues: ['b2', 'glacier'],
    private: true
  },
  createdAt: {
    type: Date
  }
}
