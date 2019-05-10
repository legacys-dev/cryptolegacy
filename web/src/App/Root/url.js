import getEnv from './getEnv'

const urls = {
  local: `http://${window.location.hostname}:3000`,
  dev: 'http://cryptolegacy-dev-beta.nfycbwvxyb.us-west-2.elasticbeanstalk.com',
  prod: ''
}

const env = getEnv()

if (env !== 'local' && window.location.protocol !== 'https:') {
  window.location.protocol = 'https:'
}

export default urls[env]
