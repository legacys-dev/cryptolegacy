import { subscription } from '@orion-js/graphql'
import Vault from 'app/models/Vault'

export default subscription({
  params: {
    vaultId: {
      type: 'ID'
    }
  },
  returns: Vault
})
