import {Collection} from '@orion-js/app'
import PersonalVault from 'app/models/PersonalVault'

export default new Collection({
  name: 'personal_vaults',
  model: PersonalVault,
  indexes: []
})
