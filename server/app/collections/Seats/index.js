import { Collection } from '@orion-js/app'
import Seat from 'app/models/Seat'

export default new Collection({
  name: 'seats',
  model: Seat,
  indexes: []
})
