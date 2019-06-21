import {resolver, generateId} from '@orion-js/app'
import {hashPassword} from '@orion-js/auth'
import {heritageCreated} from 'app/helpers/emails'
import {emailValidator} from 'app/helpers/registration'
import VaultPolicies from 'app/collections/VaultPolicies'
import getEncryptedCredentialsForHeir from './getEncryptedCredentialsForHeir'
import Users from 'app/collections/Users'
import getVaultName from './getVaultName'

export default resolver({
  params: {
    vaultId: {
      type: 'ID'
    },
    email: {
      type: String,
      label: 'Email del heredero',
      async custom(email) {
        email = email.toLowerCase()
        if (!emailValidator(email)) return 'invalidEmail'
      }
    },
    credentials: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  vaultOwner: true,
  vaultPolicyOwner: true,
  requireLogin: true,
  async resolve({vaultId, email, credentials}, viewer) {
    const vaultOwner = await Users.findOne({_id: viewer.userId})
    const ownerVaultCredentials = await VaultPolicies.findOne({
      vaultId,
      userId: viewer.userId,
      status: 'active'
    })

    const {privateKey, passphrase} = vaultOwner.messageKeys
    const heirCode = generateId(16)

    const createHeirCredentialsParams = {
      privateKey,
      passphrase,
      ownerEncryptedCredentials: credentials,
      encryptedVaultCredentials: ownerVaultCredentials.vaultPassword,
      heirCode
    }

    const heirVaultPassword = await getEncryptedCredentialsForHeir(createHeirCredentialsParams)

    const userEmail = email.toLowerCase()
    const heritage = await VaultPolicies.findOne({
      userEmail,
      creatorId: viewer.userId,
      status: 'waiting'
    })

    const requiredParams = {
      vaultPassword: heirVaultPassword,
      'transferData.code.bcrypt': hashPassword(heirCode),
      'transferData.code.createdAt': new Date(),
      'transferData.accessToken': generateId(201)
    }

    const insertParams = {
      creatorId: viewer.userId,
      vaultId,
      userEmail,
      credentialType: 'heritage',
      status: 'waiting',
      ...requiredParams
    }

    if (heritage) await heritage.remove() // await not necessary

    let hasError
    try {
      await VaultPolicies.insert(insertParams)
    } catch (error) {
      hasError = !!error
      console.log('Error:', error)
    }

    if (hasError) throw new Error('Error creating a heritage')

    const inheritor = await Users.findOne({'emails.address': userEmail})

    const owner = {
      ownerEmail: await vaultOwner.email(),
      ownerName: await vaultOwner.name(),
      ownerLastName: await vaultOwner.lastName()
    }

    const user = {
      email: userEmail,
      name: inheritor ? await inheritor.name() : null,
      lastName: inheritor ? await inheritor.lastName() : null
    }

    heritageCreated({
      owner,
      user,
      code: heirCode,
      vaultName: await getVaultName({heritage, vaultId})
    })

    return true
  }
})
