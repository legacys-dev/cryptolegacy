import {google} from 'googleapis'
import authentication from './authentication'
import {generateId} from '@orion-js/app'

export default async userEmail => {
  const auth = authentication()
  const drive = google.drive({version: 'v3', auth})

  const folder = await drive.files.create({
    resource: {
      name: `CryptoFolder-${generateId(10)}`,
      mimeType: 'application/vnd.google-apps.folder'
    },
    fields: 'id'
  })

  const folderId = folder.data.id

  await drive.permissions.create({
    fileId: folderId,
    resource: {
      type: 'user',
      role: 'writer',
      emailAddress: userEmail
    }
  })

  return folderId
}
