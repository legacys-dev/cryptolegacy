import { google } from 'googleapis'
import authentication from './authentication'
import streamToBuffer from 'stream-to-buffer'
import stream from 'stream'

export default async ({ fileId, cloudName, fileType }) => {
  const auth = await authentication()
  const drive = google.drive({ version: 'v3', auth, encoding: null })

  const spreadsheet = await drive.files.get({
    fileId,
    alt: 'media',
    mimeType: fileType
  })

  const bStream = new stream.PassThrough()
  bStream.end(spreadsheet.data)

  const buffer = await new Promise((resolve, reject) => {
    streamToBuffer(bStream, function(error, buffer) {
      if (error) reject(error)
      if (buffer) resolve(buffer)
    })
  })

  return Buffer.from(buffer, 'utf8')
}
