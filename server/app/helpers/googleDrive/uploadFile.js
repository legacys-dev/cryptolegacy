import { google } from 'googleapis'
import authentication from './authentication'
import stream from 'stream'

export default async ({ fileName, fileType, file, folderId }) => {
  const auth = await authentication()
  const drive = google.drive({ version: 'v3', auth })

  const bStream = new stream.PassThrough()
  bStream.end(file.Body.toString())
  console.log({ file })
  const media = {
    mimeType: fileType,
    body: bStream
  }

  const spreadsheet = await drive.files.create({
    resource: {
      name: fileName,
      parents: [folderId]
    },
    media,
    fields: 'id'
  })

  return spreadsheet.data.id
}
