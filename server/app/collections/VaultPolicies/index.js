import {Collection} from '@orion-js/app'
import VaultPolicy from 'app/models/VaultPolicy'

export default new Collection({
  name: 'vault_policies',
  model: VaultPolicy,
  indexes: [{keys: {userId: 1, vaultId: 1}, options: {unique: true}}]
})
