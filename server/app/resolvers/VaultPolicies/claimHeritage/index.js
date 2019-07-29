import {resolver, PermissionsError} from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'
import Users from 'app/collections/Users'
import getHeirVaultPassword from './getHeirVaultPassword'
import {claimedHeritage} from 'app/helpers/emails'
import bcrypt from 'bcryptjs'

export default resolver({
  params: {
    code: {
      type: String
    },
    accessToken: {
      type: String
    },
    credentials: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({code, accessToken, credentials}, viewer) {
    const user = await Users.findOne({_id: viewer.userId})
    const vaultPolicy = await VaultPolicies.findOne({
      'transferData.accessToken': accessToken,
      status: 'available'
    })

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

    const {privateKey} = user.messageKeys
    const claimParams = {
      userCredentials: credentials,
      code,
      encryptedVaultPassword: vaultPolicy.vaultPassword,
      privateKey
    }

    const encryptedUserVaultPassword = await getHeirVaultPassword(claimParams)

    await vaultPolicy.update({
      $set: {userId: viewer.userId, vaultPassword: encryptedUserVaultPassword, status: 'active'}
    })

    const userInformation = {
      email: await user.email(),
      name: await user.name(),
      lastName: await user.lastName()
    }

    claimedHeritage({user: userInformation, vaultName: await vaultPolicy.vaultName()}) // await not necessary

    return true
  }
})
