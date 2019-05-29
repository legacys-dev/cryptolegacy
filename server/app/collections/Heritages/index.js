import {Collection} from '@orion-js/app'
import Heritage from 'app/models/Heritage'

export default new Collection({
  name: 'heritages',
  model: Heritage,
  indexes: [{keys: {inheritorEmail: 1, vaultId: 1}, options: {unique: true}}]
})
