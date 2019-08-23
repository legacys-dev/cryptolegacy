import Vaults from 'app/collections/Vaults'

export default async function({viewer, name}) {
  const glacierVault = await Vaults.findOne({name})

  if (glacierVault) throw new Error('Vault with this name already exist')
}
