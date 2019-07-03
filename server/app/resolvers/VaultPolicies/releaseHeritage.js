import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import {heritageAvailable} from 'app/helpers/emails'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {
    vaultPolicyId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  requireRole: 'admin',
  requireLogin: true,
  async resolve({vaultPolicyId}, viewer) {
    const vaultPolicy = await VaultPolicies.findOne({_id: vaultPolicyId, status: 'waiting'})
    if (!vaultPolicy) throw new Error('Vault policy not found')

    const user = await Users.findOne({'emails.address': vaultPolicy.userEmail})

    if (!user) throw new Error('Inheritor not found')

    await vaultPolicy.update({$set: {status: 'available'}})

    const userInformation = {
      email: await user.email(),
      name: await user.name(),
      lastName: await user.lastName()
    }

    const {accessToken} = vaultPolicy.transferData

    await heritageAvailable({
      user: userInformation,
      accessToken,
      vaultName: await vaultPolicy.vaultName()
    })

    return true
  }
})
