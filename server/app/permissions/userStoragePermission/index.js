import cloneDeep from 'lodash/cloneDeep'
import userHasFreeStorageLeft from './userHasFreeStorageLeft'

export default async function(options, viewer, { params }) {
  params = cloneDeep(params)

  const { checkUserStorage } = options
  const { size } = { params }
  if (checkUserStorage) {
    await userHasFreeStorageLeft({ size, viewer })
  }
}
