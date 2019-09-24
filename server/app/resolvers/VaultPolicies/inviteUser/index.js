import { resolver, generateId } from '@orion-js/app'
import { hashPassword } from '@orion-js/auth'
import { vaultInvitation } from 'app/helpers/emails'
import { emailValidator } from 'app/helpers/registration'
import VaultPolicies from 'app/collections/VaultPolicies'
import getEncryptedCredentialsForInvitedUser from './getEncryptedCredentialsForInvitedUser'
import Users from 'app/collections/Users'
import getVaultName from './getVaultName'

export default resolver({
  params: {
    vaultId: {
      type: 'ID'
    },
    email: {
      type: String,
      async custom(email, { doc }) {
        email = email.toLowerCase()
        if (!emailValidator(email)) return 'invalidEmail'

        const invited = await Users.findOne({ 'emails.address': email })
        if (!invited) return 'userNotFound'

        const policy = await VaultPolicies.findOne({
          userEmail: email,
          vaultId: doc.vaultId,
          credentialType: 'invitation'
        })

        if (policy) return 'userHasInvitation'
      }
    },
    role: {
      type: String
    },
    credentials: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  policyAuthorization: true,
  requirePlan: true,
  async resolve({ vaultId, email, role, credentials }, viewer) {
    const vaultOwner = await Users.findOne({ _id: viewer.userId })
    const invitedUser = await Users.findOne({ 'emails.address': email })
    const ownerVaultCredentials = await VaultPolicies.findOne({
      vaultId,
      userId: viewer.userId,
      status: 'active'
    })

    if ((await vaultOwner.email()) === (await invitedUser.email())) {
      throw new Error('You cant invite yourself')
    }

    const { privateKey } = vaultOwner.messageKeys
    const heirCode = invitedUser._id.slice(0, 16)

    const createInvitedCredentialsParams = {
      privateKey,
      ownerEncryptedCredentials: credentials,
      encryptedVaultCredentials: ownerVaultCredentials.vaultPassword,
      heirCode
    }

    const invitedVaultPassword = await getEncryptedCredentialsForInvitedUser(
      createInvitedCredentialsParams
    )

    const userEmail = email.toLowerCase()
    const requiredParams = {
      vaultPassword: invitedVaultPassword,
      'transferData.code.bcrypt': hashPassword(heirCode),
      'transferData.code.createdAt': new Date(),
      'transferData.accessToken': generateId(201)
    }

    const insertParams = {
      creatorId: viewer.userId,
      vaultId,
      userId: invitedUser._id,
      userEmail,
      role,
      credentialType: 'invitation',
      status: 'available',
      viewed: false,
      ...requiredParams
    }

    const invitation = await VaultPolicies.insert(insertParams)

    const owner = {
      ownerEmail: await vaultOwner.email(),
      ownerName: await vaultOwner.name(),
      ownerLastName: await vaultOwner.lastName()
    }

    const user = {
      email: userEmail,
      name: invitedUser ? await invitedUser.name() : null,
      lastName: invitedUser ? await invitedUser.lastName() : null
    }

    vaultInvitation({
      owner,
      user,
      vaultName: await getVaultName({ invitation, vaultId })
    })

    return true
  }
})
