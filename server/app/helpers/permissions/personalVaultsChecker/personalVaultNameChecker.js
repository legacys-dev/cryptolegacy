import PersonalVaults from 'app/collections/PersonalVaults'

export default async function({viewer, name}) {
  const personalVault = await PersonalVaults.findOne({name})

  if (personalVault) throw new Error('Vault with this name already exist')
}
