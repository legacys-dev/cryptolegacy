import React from 'react'
import Limit from './Limit'
import Page from './Page'

const Pagination = ({result, pages, limit, setPage, setLimit}) => {
  return (
    <div className="paginated-pagination">
      <div className="paginated-pagination-limit">
        <Limit {...this.props} />
      </div>
      <div className="paginated-pagination-pages">
        <Page {...this.props} />
      </div>
    </div>
  )
}

export default Pagination
