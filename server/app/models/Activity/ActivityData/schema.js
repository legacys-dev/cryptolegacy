export default {
  action: {
    type: String,
    allowedValues: [
      'uploadFile',
      'downloadFile',
      'deleteFile',
      'createVault',
      'updateVault',
      'deleteVault'
    ]
  },
  fileName: {
    type: String,
    optional: true
  },
  fileType: {
    type: String,
    optional: true
  },
  vaultName: {
    type: String
  }
}
