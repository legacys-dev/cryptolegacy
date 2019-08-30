import { Collection } from '@orion-js/app'
import File from 'app/models/File'

export default new Collection({
  name: 'files',
  model: File,
  indexes: []
})
