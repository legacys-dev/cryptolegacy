import { route } from '@orion-js/app'
import { downloadFile } from 'app/helpers/googleDrive'

route('/get-google-drive-file/:fileId/:cloudName/:fileType', async function({
  params,
  query,
  pathname,
  request,
  headers,
  response,
  getBody
}) {
  const { fileId, cloudName, fileType } = params

  let result
  try {
    result = await downloadFile({ fileId, cloudName, fileType })
  } catch (error) {
    console.log(error)
  }

  return result
})
