import cloneDeep from 'lodash/cloneDeep'
import vaultNameChecker from './vaultNameChecker'

export default async function(options, viewer, { params }) {
  params = cloneDeep(params)

  const { checkVaultName } = options
  const { name } = params

  if (checkVaultName) {
    await vaultNameChecker({ viewer, name })
  }
}
