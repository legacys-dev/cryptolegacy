import {resolver} from '@orion-js/app'
import createUserKeys from 'app/helpers/keys/createUserKeys'

export default resolver({
  params: {},
  returns: String,
  async resolve(params, viewer) {
    const hash = '6:weBt6DuE-7aEX99e4at-YPwnwHCh:1'
    const asd = await createUserKeys(hash)
    console.log({asd})
    return true
  }
})
