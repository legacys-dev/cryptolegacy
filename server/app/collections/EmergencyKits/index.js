import { Collection } from '@orion-js/app'
import EmergencyKit from 'app/models/EmergencyKit'

export default new Collection({
  name: 'emergency_kits',
  model: EmergencyKit,
  indexes: [{ keys: { userId: 1 }, options: { unique: true } }]
})
