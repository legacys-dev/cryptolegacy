export default {
  action: {
    type: String,
    allowedValues: [
      'uploadFile',
      'downloadFile',
      'deleteFile',
      'restoreFile',
      'createVault',
      'updateVault',
      'deleteVault'
    ]
  },
  fileName: {
    type: String,
    optional: true
  },
  vaultName: {
    type: String
  },
  newVaultName: {
    type: String,
    optional: true
  }
}
