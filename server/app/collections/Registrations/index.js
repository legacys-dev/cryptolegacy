import {Collection} from '@orion-js/app'
import Registration from 'app/models/Registration'

export default new Collection({
  name: 'registations',
  model: Registration,
  indexes: []
})
