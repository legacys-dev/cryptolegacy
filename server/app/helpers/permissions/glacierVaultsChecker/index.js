import cloneDeep from 'lodash/cloneDeep'
import vaultNameChecker from './vaultNameChecker'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {checkVaultName} = options

  if (checkVaultName) {
    const {name} = params
    await vaultNameChecker({viewer, name})
  }
}
