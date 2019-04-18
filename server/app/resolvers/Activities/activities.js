import {paginatedResolver} from '@orion-js/app'
import escape from 'escape-string-regexp'
import Activity from 'app/models/Activity'
import Activities from 'app/collections/Activities'

export default paginatedResolver({
  returns: Activity,
  params: {
    filter: {
      type: String,
      optional: true
    }
  },
  requireLogin: true,
  async getCursor({filter}, viewer) {
    const query = {userId: viewer.userId}

    if (filter) {
      query.name = {$regex: new RegExp(`^${escape(filter)}`)}
    }

    return await Activities.find(query)
  }
})
