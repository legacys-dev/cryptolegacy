import getFromGlacier from './getFromGlacier'
import getGlacierJobStatus from './getGlacierJobStatus'
import updateVault from './updateVault'
import getFromS3 from './getFromS3'
import getFromDrive from './getFromDrive'
import vaultName from './vaultName'
import getFromB2 from './getFromB2'
import data from './data'

export default {
  getGlacierJobStatus,
  updateVault,
  data,
  getFromB2,
  vaultName,
  getFromGlacier,
  getFromS3,
  getFromDrive
}
