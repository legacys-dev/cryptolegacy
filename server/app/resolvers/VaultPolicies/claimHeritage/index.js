import {resolver, PermissionsError} from '@orion-js/app'
import Users from 'app/collections/Users'
import VaultPolicies from 'app/collections/VaultPolicies'
import {claimedHeritage} from 'app/helpers/emails'
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
    const vaultPolicy = await VaultPolicies.findOne({accessToken, status: 'available'})

    if (!vaultPolicy) {
      throw new PermissionsError('unauthorized', {message: 'Unauthorized credentials access'})
    }

    if (!user) {
      throw new PermissionsError('unauthorized', {message: 'Unauthorized credentials access'})
    }

    if ((await user.email()) !== vaultPolicy.userEmail) {
      throw new PermissionsError('unauthorized', {message: 'Unauthorized credentials access'})
    }

    if (!bcrypt.compareSync(code, vaultPolicy.transferData.code.bcrypt)) {
      throw new PermissionsError('unauthorized', {message: 'Wrong code'})
    }

    await vaultPolicy.update({$set: {userId: viewer.userId, credentialType: 'heritage'}})

    const userInformation = {
      email: await user.email(),
      name: await user.name(),
      lastName: await user.lastName()
    }

    claimedHeritage({user: userInformation, vaultName: await vaultPolicy.vaultName()}) // await not necessary

    return true
  }
})
