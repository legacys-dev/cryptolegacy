import cloneDeep from 'lodash/cloneDeep'
import userHasFreeStorageLeft from './userHasFreeStorageLeft'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {checkUserStorage} = options

  if (checkUserStorage) {
    const {size} = {params}
    await userHasFreeStorageLeft({size, viewer})
  }
}
