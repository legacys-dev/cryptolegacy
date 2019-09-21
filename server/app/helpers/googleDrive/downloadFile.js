import { google } from 'googleapis'
import authentication from './authentication'
import streamToBuffer from 'stream-to-buffer'
import stream from 'stream'

export default async ({ fileId, cloudName, fileType }) => {
  const auth = await authentication()
  const drive = google.drive({ version: 'v3', auth })

  const spreadsheet = await drive.files.get({
    fileId,
    alt: 'media',
    mimeType: fileType
  })

  const bStream = new stream.PassThrough()
  bStream.end(spreadsheet.data)

  let newBuffer
  try {
    newBuffer = await new Promise((resolve, reject) => {
      streamToBuffer(bStream, (err, buffer) => {
        if (err) reject(err)
        if (buffer) resolve(buffer)
      })
    })
  } catch (error) {
    console.log('Error:', error)
    return
  }

  return newBuffer
}
