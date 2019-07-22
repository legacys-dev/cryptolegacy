export default k => {
  if (!k) throw new Error('Error with keys elements')
  if (typeof k !== 'object') throw new Error('Error with key object, type is invalid')

  const {sInterval, iInterval, initial, central, latest} = k

  return sInterval + ':' + initial + '-' + central + '-' + latest + ':' + iInterval
}
