import {Collection} from '@orion-js/app'
import VaultCredential from 'app/models/VaultCredential'

export default new Collection({
  name: 'vault_credentials',
  model: VaultCredential,
  indexes: [{keys: {userId: 1, vaultId: 1}, options: {unique: true}}]
})
