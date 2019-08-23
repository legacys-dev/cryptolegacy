import Vaults from 'app/collections/Vaults'
import VaultPolicies from 'app/collections/VaultPolicies'
import {getVaultsIds} from 'app/helpers/vaults'

export default async function({viewer}) {
  const vaultPolicies = await VaultPolicies.find({
    userId: viewer.userId,
    credentialType: 'owner'
  }).toArray()

  if (!vaultPolicies) return

  const vaultsIds = getVaultsIds(vaultPolicies)
  const vaults = await Vaults.findOne({_id: {$in: vaultsIds}, type: 'drive'})

  if (vaults) throw new Error('You already have a google drive vault')
}
