import AWS from 'aws-sdk'
import credentials from './credentials'

export default function(vaultName) {
  const vault =
    vaultName || 'arn:aws:glacier:us-east-2:366021072735:vaults/examplevaultexamplevault'

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-west-2'
  })

  console.log(AWS.config)
  const glacier = new AWS.Glacier({apiVersion: '2012-06-01'})

  const fs = require('fs')
  const file = fs.readFileSync(
    '/home/nicolas/projects/cryptolegacy/server/app/helpers/glacier/example.txt'
  )
  const params = {vaultName: vault, body: file}

  const archive = {}
  glacier.uploadArchive(params, function(err, data) {
    if (err) console.log('Error uploading archive!', err)
    else archive.archiveId = data.archiveId
  })

  return archive
}
