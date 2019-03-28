import {paginatedResolver} from '@orion-js/app'
import escape from 'escape-string-regexp'
import Files from 'app/collections/Files'
import File from 'app/models/File'

export default paginatedResolver({
  returns: File,
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

    return Files.find(query)
  }
})
