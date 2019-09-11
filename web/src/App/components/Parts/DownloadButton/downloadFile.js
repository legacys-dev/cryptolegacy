import { archiveDecryptWithPassword } from 'App/helpers/crypto'
import { generateArchiveIv } from 'App/helpers/keys'

async function download(url, name, opts, fileId, _global) {
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('progress', opts)
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  const id = fileId.slice(0, 16)
  const iv = await generateArchiveIv(id)

  xhr.onload = async function() {
    const respuesta = xhr.response
    const file = await new Promise((resolve, reject) => {
      let reader = new FileReader()

      reader.onload = () => {
        const data = reader.result
        const buffer = new Int8Array(data)
        resolve(Buffer.from(buffer, 'base64'))
      }

      reader.readAsArrayBuffer(respuesta)
    })

    const url = window.location.pathname.split('/').slice(-1)[0]
    const vault = JSON.parse(localStorage.getItem('vault'))
    const cipherPassword = vault[url]
    const decrypted = archiveDecryptWithPassword({
      encryptedItem: file,
      cipherPassword: cipherPassword,
      archiveIv: iv
    })

    const fileDownload = require('react-file-download')
    fileDownload(decrypted, name)
    saveAs(xhr.response, name, opts, fileId, _global)
  }
  xhr.onerror = function(error) {
    console.log(error)
    console.error('could not download file')
  }
  xhr.send()
}

async function saveAs(blob, name, opts, fileId, _global) {
  const URL = _global.URL || _global.webkitURL
  const a = document.createElement('a')
  name = name || blob.name || 'download'
  a.download = name
  a.rel = 'noopener'

  if (typeof blob === 'string') {
    a.href = blob
    await download(blob, name, opts, fileId, _global)
  } else {
    a.href = URL.createObjectURL(blob)
  }
}

export default async ({ fileId, downloadUrl, fileName, downloadProgress }) => {
  const _global =
    typeof window === 'object' && window.window === window
      ? window
      : typeof self === 'object' && self.self === self
      ? self
      : typeof global === 'object' && global.global === global
      ? global
      : this

  saveAs(downloadUrl, fileName, downloadProgress, fileId, _global)
}
