import VaultPolicies from 'app/collections/VaultPolicies'

export default async function password(vault, params, viewer) {
  const vaultCredentials = await VaultPolicies.findOne({
    vaultId: vault._id,
    userId: viewer.userId
  })
  return vaultCredentials.vaultPassword
}
