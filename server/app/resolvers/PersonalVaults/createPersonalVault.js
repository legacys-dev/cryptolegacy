import {resolver} from '@orion-js/app'
import PersonalVaults from 'app/collections/PersonalVaults'

export default resolver({
  params: {
    name: {
      type: String,
      label: 'Nombre de la bóveda'
    }
  },
  requireLogin: true,
  personalVNameChecker: true,
  returns: String,
  mutation: true,
  async resolve({name}, viewer) {
    const params = {
      name,
      userId: viewer.userId,
      createdAt: new Date()
    }

    const _id = await PersonalVaults.insert(params)

    return _id
  }
})
