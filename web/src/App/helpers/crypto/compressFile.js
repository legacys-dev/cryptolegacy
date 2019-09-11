import zlib from 'zlib'

export default async input => {
  var compressed = await new Promise((resolve, reject) => {
    zlib.deflate(input, (error, buffer) => {
      if (error) reject(error)
      if (buffer) resolve(buffer)
      return buffer
    })
  })
  return compressed
}
