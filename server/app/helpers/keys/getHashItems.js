export default function(hash) {
  if (!hash) throw new Error('Hash missing')
  if (hash.length !== 32) throw new Error('Invalid hash length')

  const hashItems = hash.split(':')

  if (hashItems.length !== 3) throw new Error('Invalid hash object length')

  const secretKeyInterval = hashItems[0]
  const ivKeyInterval = hashItems[2]

  if (isNaN(parseInt(secretKeyInterval, 10))) throw new Error('Invalid hash interval s, not number')
  if (isNaN(parseInt(ivKeyInterval, 10))) throw new Error('Invalid hash interval i, not number')

  if (secretKeyInterval > 9 || secretKeyInterval < 0) throw new Error('Invalid hash interval')
  if (ivKeyInterval > 9 || ivKeyInterval < 0) throw new Error('Invalid hash interval interval')

  return {
    secretKeyInterval,
    ivKeyInterval,
    original: hash
  }
}