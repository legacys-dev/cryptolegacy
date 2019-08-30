import { Collection } from '@orion-js/app'
import Activity from 'app/models/Activity'

export default new Collection({
  name: 'activities',
  model: Activity,
  indexes: []
})
