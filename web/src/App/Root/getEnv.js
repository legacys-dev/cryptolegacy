const hostname = window.location.hostname

const isDev = hostname.includes('dev.')
const isBeta = hostname.includes('beta.')

const isProduction = !isDev && !isBeta && (hostname.includes('.com') || hostname.includes('.io'))

const forceProd = false

export default () =>
  isProduction || forceProd ? 'prod' : isDev ? 'dev' : isBeta ? 'beta' : 'local'
