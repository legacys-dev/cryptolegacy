import zlib from 'zlib'

export default async data => {
  const toDecompress = data
  var decompressed = await new Promise((resolve, reject) => {
    zlib.unzip(toDecompress, (err, buffer) => {
      if (!err && buffer) {
        resolve(buffer.toString())
      } else {
      }
    })
  })
  return Buffer.from(decompressed)
}
