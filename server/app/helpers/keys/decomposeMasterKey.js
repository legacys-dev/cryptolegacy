import { hashPassword } from '@orion-js/auth'
import getHashItems from './getHashItems'

export default function({ masterKey, userId }) {
  const keysItems = getHashItems(masterKey)

  return {
    sInterval: keysItems.secretKeyInterval,
    iInterval: keysItems.ivKeyInterval,
    initial: keysItems.hashOne,
    central: keysItems.hashTwo,
    latest: keysItems.hashThree,
    secret: hashPassword(userId)
  }
}
