import getEnv from './getEnv'

const urls = {
  local: `http://${window.location.hostname}:3000`,
  dev: 'https://apidev.cryptolegacy.io',
  beta: 'https://apibeta.cryptolegacy.io',
  prod: ''
}

const env = getEnv()

if (env !== 'local' && window.location.protocol !== 'https:') {
  window.location.protocol = 'https:'
}

export default urls[env]
