import cloneDeep from 'lodash/cloneDeep'
import filesPermissions from './filesPermissions'
import sizePermissions from './sizePermissions'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {filePermissions, checkSize} = options
  const {fileId,size} = params

  if (filePermissions) {
    await filesPermissions({fileId, viewer})
  }
  
  if (checkSize){
    await sizePermissions({viewer,size})
  }
}
