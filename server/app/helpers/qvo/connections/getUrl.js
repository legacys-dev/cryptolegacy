export default () => {
  const isLocal = process.env.ORION_LOCAL
  const isBeta = process.env.BETA
  return isLocal || isBeta ? 'https://playground.qvo.cl' : 'production url'
}
