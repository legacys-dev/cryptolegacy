export default function(fileSize) {
  const glacierMaxParts = 10000
  let n = 20
  let partSize = 1024 * 1024 // 1MB chunks

  while (fileSize / partSize > glacierMaxParts) partSize = Math.pow(2, (n += 1))

  const numPartsLeft = Math.ceil(fileSize / partSize)

  return { partSize, numPartsLeft, fileSize }
}
