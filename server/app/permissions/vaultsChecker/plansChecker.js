import { PermissionsError } from '@orion-js/app'
import Users from 'app/collections/Users'
import VaultPolicies from 'app/collections/VaultPolicies'
import Vaults from 'app/collections/Vaults'
import { getVaultsIds } from 'app/helpers/vaults'
import isEmpty from 'lodash/isEmpty'
import { getSubscription } from 'app/helpers/qvo'

export default async function({ viewer, type }) {
  const user = await Users.findOne({ _id: viewer.userId })
  const vaultPolicies = await VaultPolicies.find({
    userId: viewer.userId,
    credentialType: 'owner'
  }).toArray()

  const vaultsIds = getVaultsIds(vaultPolicies)
  const vaults = await Vaults.find({ _id: { $in: vaultsIds } }).toArray()

  /** ** FREE PLAN ****/
  if (isEmpty(user.qvo.subscriptionId)) {
    if (!isEmpty(vaults)) {
      throw new PermissionsError('unauthorized', { message: "You can't create more vaults" })
    } else if (type === 'drive') {
      throw new PermissionsError('unauthorized', { message: "You can't create a drive vault" })
    }
  } else {
    /** ** OTHER PLANS ****/
    let subscription

    try {
      subscription = await getSubscription(user.qvo.subscriptionId)
    } catch (error) {
      console.log('Error:', error)
      throw new PermissionsError('unauthorized', { message: 'Error getting your subscription' })
    }

    if (subscription.status !== 'active') {
      throw new PermissionsError('unauthorized', { message: 'Your plan is not active' })
    }

    if (subscription.plan.id === 'individual') {
      if (type === 'drive') {
        throw new PermissionsError('unauthorized', { message: "You can't create a drive vault" })
      } else if (vaults.length >= 3) {
        throw new PermissionsError('unauthorized', {
          message: "You can't create more than 3 vaults"
        })
      }
    }

    if (subscription.plan.id === 'multiple') {
      const vaults = await Vaults.findOne({ _id: { $in: vaultsIds }, type: 'drive' })
      if (vaults) throw new Error('You already have a google drive vault')
    }
  }
}
