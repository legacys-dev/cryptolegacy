import {resolver, generateId} from '@orion-js/app'
import {emailTest} from 'app/helpers/registration'
import Heritages from 'app/collections/Heritages'
import Users from 'app/collections/Users'
import {heritageCreated} from 'app/helpers/emails'

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
        if (!emailTest(email)) return 'invalidEmail'
      }
    }
  },
  returns: Boolean,
  mutation: true,
  vaultOwner: true,
  requireLogin: true,
  async resolve({vaultId, email}, viewer) {
    const heritage = await Heritages.findOne({
      userId: viewer.userId,
      inheritorEmail: email.toLowerCase(),
      status: 'waiting'
    })

    const requiredParams = {
      code: Math.random()
        .toString()
        .slice(2, 11)
        .toString(),
      accessToken: generateId(151)
    }

    const inheritorEmail = email.toLowerCase()
    const reclaimIdentificator = Math.random()
      .toString()
      .slice(2, 5)
      .toString()

    if (heritage) {
      await heritage.update({$set: requiredParams})
    } else {
      const insertParams = {
        userId: viewer.userId,
        vaultId,
        reclaimIdentificator,
        inheritorEmail,
        status: 'waiting',
        ...requiredParams
      }

      await Heritages.insert(insertParams)
    }

    const vaultOwner = await Users.findOne({_id: viewer.userId})
    const inheritor = await Users.findOne({'emails.address': inheritorEmail})

    const owner = {
      ownerEmail: await vaultOwner.email(),
      ownerName: await vaultOwner.name(),
      ownerLastName: await vaultOwner.lastName()
    }

    const user = {
      email: inheritorEmail,
      name: inheritor ? await inheritor.name() : null,
      lastName: inheritor ? await inheritor.lastName() : null
    }

    await heritageCreated({owner, user, code: requiredParams.code, reclaimIdentificator})

    return true
  }
})
