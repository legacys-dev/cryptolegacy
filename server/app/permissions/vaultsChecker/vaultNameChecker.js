import Vaults from 'app/collections/Vaults'

export default async function({ viewer, name }) {
  const vault = await Vaults.findOne({ name })

  if (vault) throw new Error('Vault with this name already exist')
}
