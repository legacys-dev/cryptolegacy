import cloneDeep from 'lodash/cloneDeep'
import heritagesPermissions from './heritagesPermissions'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {heritagePaginatedPermissions} = options

  if (heritagePaginatedPermissions) {
    const {vaultId, filter, adminPanel, status} = params
    await heritagesPermissions({vaultId, filter, adminPanel, status, viewer})
  }
}
