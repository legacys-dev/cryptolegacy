import React from 'react'
import styles from './styles.module.css'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'

const offset = 3

const Pagination = ({currentPage, search, totalPages, hasNextPage, hasPreviousPage}) => {
  const renderPages = pages => {
    return pages.map((page, index) => {
      return (
        <div
          className="col-xs-12 col-sm-4"
          key={index}
          onClick={() => {
            search(page)
          }}>
          <div className={styles.page}>{page}</div>
        </div>
      )
    })
  }

  const renderCurrentPage = () => {
    return (
      <div className={styles.currentPage}>
        <strong>{currentPage}</strong>
      </div>
    )
  }

  const renderPreviousPages = () => {
    const pages = []
    for (let i = currentPage - offset; i < currentPage; i++) {
      if (i > 0) pages.push(i)
    }
    return renderPages(pages)
  }

  const renderNextPages = () => {
    const pages = []
    for (let i = currentPage + offset; i > currentPage; i--) {
      if (i <= totalPages) pages.unshift(i)
    }
    return renderPages(pages)
  }

  const pagination = () => {
    return (
      <div className={styles.pagination}>
        <div className="row center-sm">
          <div className="col-xs-12 col-sm-3 end-sm">{renderLeft()}</div>
          <div className="col-xs-12 col-sm-2">
            <div className="row">{renderPreviousPages()}</div>
          </div>
          <div className="col-xs-12 col-sm-2">{renderCurrentPage()}</div>
          <div className="col-xs-12 col-sm-2">
            <div className="row">{renderNextPages()}</div>
          </div>
          <div className="col-xs-12 col-sm-3 start-sm">{renderRight()}</div>
        </div>
      </div>
    )
  }

  const renderLeft = () => {
    return (
      <div
        className={
          hasPreviousPage
            ? 'paginated-pagination-page-icon'
            : 'paginated-pagination-page-icon-disabled'
        }
        onClick={() => hasPreviousPage && search(currentPage - 1)}>
        <MdKeyboardArrowLeft size={25} />
      </div>
    )
  }

  const renderRight = () => {
    return (
      <div
        className={
          hasNextPage ? 'paginated-pagination-page-icon' : 'paginated-pagination-page-icon-disabled'
        }
        onClick={() => hasNextPage && search(currentPage + 1)}>
        <MdKeyboardArrowRight size={25} />
      </div>
    )
  }

  if (totalPages) return <span />
  return (
    <div className={styles.container}>
      <div>{pagination()}</div>
    </div>
  )
}

export default Pagination
