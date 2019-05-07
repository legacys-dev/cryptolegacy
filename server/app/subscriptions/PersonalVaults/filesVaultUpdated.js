import {subscription} from '@orion-js/graphql'
import PersonalVault from 'app/models/PersonalVault'

export default subscription({
  params: {
    personalVaultId: {
      type: 'ID'
    }
  },
  returns: PersonalVault
})
