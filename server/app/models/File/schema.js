import S3Data from './S3Data'
import GlacierData from './GlacierData'
import B2Data from './B2Data'

export default {
  _id: {
    type: 'ID'
  },
  vaultId: {
    type: 'ID',
    private: true
  },
  searchSlug: {
    type: String
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
    private: true,
    allowedValues: ['b2', 'glacier']
  },
  status: {
    type: String,
    private: true,
    allowedValues: ['active', 'inTrash', 'authorizedToRemove'],
    defaultValue: 'active'
  },
  updateAt: {
    type: Date,
    optional: true
  },
  createdAt: {
    type: Date
  }
}
