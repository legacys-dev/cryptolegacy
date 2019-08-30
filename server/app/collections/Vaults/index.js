import { Collection } from '@orion-js/app'
import Vault from 'app/models/Vault'

export default new Collection({
  name: 'vaults',
  model: Vault,
  indexes: [{ keys: { name: 1 }, options: { unique: true } }]
})
