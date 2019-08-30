import { resolver } from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'
import Users from 'app/collections/Users'
import getVaultPassword from './getVaultPassword'
import { createFolder } from 'app/helpers/googleDrive'

export default resolver({
  params: {
    vaultId: {
      type: 'ID'
    },
    driveEmail: {
      type: String,
      optional: true
    },
    credentials: {
      type: String
    }
  },
  returns: String,
  private: true,
  mutation: true,
  requireLogin: true,
  async resolve({ vaultId, driveEmail, credentials }, viewer) {
    const user = await Users.findOne({ _id: viewer.userId })
    const { privateKey } = user.messageKeys

    const vaultPassword = await getVaultPassword({
      credentials,
      privateKey,
      vaultId,
      userId: viewer.userId
    })

    const insertParams = {
      userId: viewer.userId,
      userEmail: await user.email(),
      vaultId,
      credentialType: 'owner',
      vaultPassword,
      driveEmail,
      driveFolderId: driveEmail && (await createFolder(driveEmail)),
      status: 'active'
    }

    const vaultPolicyId = await VaultPolicies.insert(insertParams)

    return vaultPolicyId
  }
})
