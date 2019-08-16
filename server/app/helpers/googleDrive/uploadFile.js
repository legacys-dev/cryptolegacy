import {google} from 'googleapis'
import authentication from './authentication'

export default async (fileName, fileType, file, folderId) => {
  const auth = await authentication()
  const drive = google.drive({version: 'v3', auth})

  const media = {
    mimeType: fileType,
    body: file
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
