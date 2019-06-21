import Vaults from 'app/collections/Vaults'

export default async function({heritage, vaultId}) {
  if (heritage) return await heritage.vaultName()
  else {
    const vault = await Vaults.findOne(vaultId)
    return vault.name
  }
}
