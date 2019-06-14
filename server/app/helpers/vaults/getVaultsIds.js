import isEmpty from 'lodash/isEmpty'

export default function(vaultsCredentials) {
  if (isEmpty(vaultsCredentials)) return []

  const vaultsId = []
  for (const credential of vaultsCredentials) {
    vaultsId.push(credential.vaultId)
  }

  return vaultsId
}
