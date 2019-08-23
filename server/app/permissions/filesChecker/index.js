import cloneDeep from 'lodash/cloneDeep'
import filesPermissions from './filesPermissions'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {filePermissions} = options
  const {fileId} = params

  if (filePermissions) {
    await filesPermissions({fileId, viewer})
  }
}
