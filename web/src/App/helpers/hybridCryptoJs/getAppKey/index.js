import testKey from './testKey'

export default () => {
  const app = window.location.origin

  if (!app.includes('beta') && app.includes('crypto')) return 'prod_public_key'
  else return testKey
}
