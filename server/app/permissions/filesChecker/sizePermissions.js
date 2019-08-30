import {PermissionsError} from '@orion-js/app'
import Files from 'app/collections/Files'
import VaultPolicies from 'app/collections/VaultPolicies'
import Users from 'app/collections/Users'
import {getVaultsIds} from 'app/helpers/vaults'

export default async function({viewer, size}) {
  const user = await Users.findOne({_id: viewer.userId})
  const vaultPolicies = await VaultPolicies.find({
    userId: viewer.userId,
    credentialType: 'owner'
  }).toArray()

  const vaultsIds = getVaultsIds(vaultPolicies)
  const acceptedStatusForStorage = ['active', 'inTrash']

  const files = await Files.find({
    vaultId: {$in: vaultsIds},
    status: {$in: acceptedStatusForStorage}
  }).toArray()

  const storageUsed = files.reduce((sum, item) => sum + item.s3Data.size, 0)
  const newStorageUsed = storageUsed + size

  /**** FREE PLAN ****/
  if (!user.qvo.subscriptionId) {
    if (newStorageUsed > 1024*1024*100) {
      throw new PermissionsError('unauthorized', {message: "You can't upload more files"})
    }
  } 
  
  /**** OTHER PLANS ****/
  else {

    let subscription

    try {
      subscription = await getSubscription(user.qvo.subscriptionId)
    } catch (error) {
      console.log('Error:', error)
      throw new PermissionsError('unauthorized', {message: 'Error getting your subscription'})
    }

    if (subscription.status != 'active') {
      throw new PermissionsError('unauthorized', {message: 'Your plan is not active'})
    }

    if (subscription.plan.id === 'individual') {
      if (newStorageUsed > 1024 * 1024 * 200000) {
        throw new PermissionsError('unauthorized', {message: "You can't upload more files"})
      }
    }

    if (subscription.plan.id === 'multiple') {
      if (newStorageUsed > 1024 * 1024 * 1000000) {
        throw new PermissionsError('unauthorized', {message: "You can't upload more files"})
      }
    }
  }
}
