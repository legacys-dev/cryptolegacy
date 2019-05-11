import {resolver} from '@orion-js/app'
import PersonalVaults from 'app/collections/PersonalVaults'
import createActivity from 'app/resolvers/Activities/createActivity'
import {slugify} from 'app/helpers/parts'

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
      searchSlug: slugify(name),
      createdAt: new Date()
    }

    const _id = await PersonalVaults.insert(params)

    const activityTypeParams = {
      activityType: 'vault',
      actionType: 'createVault',
      vaultName: name,
      status: 'finished'
    }

    await createActivity(activityTypeParams, viewer)

    return _id
  }
})
