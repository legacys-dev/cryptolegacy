import cloneDeep from 'lodash/cloneDeep'
import kitPermissions from './kitPermissions'

export default async function(options, viewer, { params }) {
  params = cloneDeep(params)

  const { emergencyKitPermissions } = options
  const { emergencyKitId, emergencyKey } = params

  if (emergencyKitPermissions) {
    await kitPermissions({ emergencyKitId, emergencyKey, viewer })
  }
}
