import { subscription } from '@orion-js/graphql'
import User from 'app/models/User'

export default subscription({
  params: {
    userId: {
      type: 'ID'
    }
  },
  returns: User
})
