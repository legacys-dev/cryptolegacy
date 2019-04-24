import numeral from 'numeral'

export default function(size) {
  if (!size) return '0 Bytes'

  if (size > 0 && size < 1024) return `${numeral(size).format('0,0')} Bytes`

  if (size >= 1024 && size < 1024 * 1024) return `${numeral(size / 1024).format('0,0')} KB`

  if (size >= 1024 * 1024 && size < 1024 * 1024 * 1000) {
    return `${numeral(size / 1024).format('0,0')} MB`
  }

  if (size >= 1024 * 1024 * 1000 && size < 1024 * 1024 * 1000 * 1000) {
    return `${numeral(size / 1024).format('0,0')} GB`
  }

  if (size >= 1024 * 1024 * 1000 * 1000) return `${numeral(size / 1024).format('0,0')} TB`
}
