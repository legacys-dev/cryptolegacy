export default function(fileSize) {
  const b2Max = 1000
  let n = 20
  let partSize = 5 * 1024 * 1024 // 5MB chunks

  while (fileSize / partSize > b2Max) partSize = Math.pow(2, (n += 1))

  return {partSize, fileSize}
}
