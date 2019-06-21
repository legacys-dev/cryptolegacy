import {resolver, generateId} from '@orion-js/app'
import {hashPassword} from '@orion-js/auth'
import {heritageCreated} from 'app/helpers/emails'
import {emailValidator} from 'app/helpers/registration'
import VaultPolicies from 'app/collections/VaultPolicies'
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
    }
  },
  returns: Boolean,
  mutation: true,
  vaultOwner: true,
  requireLogin: true,
  async resolve({vaultId, email}, viewer) {
    const userEmail = email.toLowerCase()
    const heritage = await VaultPolicies.findOne({
      userEmail,
      creatorId: viewer.userId,
      status: 'waiting'
    })

    const userCode = Math.random()
      .toString()
      .slice(2, 11)

    const requiredParams = {
      'transferData.code.bcrypt': hashPassword(userCode),
      'transferData.code.createdAt': new Date(),
      'transferData.accessToken': generateId(201)
    }

    if (heritage) {
      await heritage.update({$set: requiredParams})
    } else {
      const insertParams = {
        creatorId: viewer.userId,
        vaultId,
        userEmail,
        status: 'waiting',
        ...requiredParams
      }

      await VaultPolicies.insert(insertParams)
    }

    const vaultOwner = await Users.findOne({_id: viewer.userId})
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

    await heritageCreated({
      owner,
      user,
      code: userCode,
      vaultName: await getVaultName({heritage, vaultId})
    })

    return true
  }
})
