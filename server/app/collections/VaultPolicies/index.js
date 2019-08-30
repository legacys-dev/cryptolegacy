import { Collection } from '@orion-js/app'
import VaultPolicy from 'app/models/VaultPolicy'

export default new Collection({
  name: 'vault_policies',
  model: VaultPolicy,
  indexes: [{ keys: { vaultId: 1, userEmail: 1 }, options: { unique: true } }]
})
