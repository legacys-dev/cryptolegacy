export default () => {
  const isLocal = process.env.LOCAL
  const isBeta = process.env.BETA
  return isLocal || isBeta ? 'https://playground.qvo.cl' : 'production url'
}
