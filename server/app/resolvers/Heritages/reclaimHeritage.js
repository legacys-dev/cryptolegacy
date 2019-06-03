import {resolver, PermissionsError} from '@orion-js/app'
import Users from 'app/collections/Users'
import Heritages from 'app/collections/Heritages'
import createVaultCredentials from 'app/resolvers/VaultCredentials/createVaultCredentials'
import {heritageReclaimed} from 'app/helpers/emails'
import bcrypt from 'bcryptjs'

export default resolver({
  params: {
    code: {
      label: 'Código',
      type: String
    },
    accessToken: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({code, accessToken}, viewer) {
    const user = await Users.findOne({_id: viewer.userId})
    const heritage = await Heritages.findOne({accessToken, status: 'available'})

    if (!heritage) {
      throw new PermissionsError('unauthorized', {message: 'Unauthorized credentials access'})
    }

    if (!user) {
      throw new PermissionsError('unauthorized', {message: 'Unauthorized credentials access'})
    }

    if ((await user.email()) !== heritage.inheritorEmail) {
      throw new PermissionsError('unauthorized', {message: 'Unauthorized credentials access'})
    }

    if (!bcrypt.compareSync(code, heritage.code.bcrypt)) {
      throw new PermissionsError('unauthorized', {message: 'Wrong code'})
    }

    const insertParams = {
      vaultId: heritage.vaultId,
      credentialType: 'heritage'
    }

    await createVaultCredentials(insertParams, viewer)

    const userData = {
      email: await user.email(),
      name: await user.name(),
      lastName: await user.lastName()
    }

    const {reclaimIdentificator} = heritage
    await heritageReclaimed({user: userData, reclaimIdentificator})

    return true
  }
})
