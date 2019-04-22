import React from 'react'
import styles from './styles.css'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import PropTypes from 'prop-types'

const offset = 3

export default class Pagination extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number,
    search: PropTypes.func,
    totalPages: PropTypes.number,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool
  }

  renderPages(pages) {
    return pages.map((page, index) => {
      return (
        <div className="col-xs-12 col-sm-4" key={index} onClick={() => this.props.search(page)}>
          <div className={styles.page}>{page}</div>
        </div>
      )
    })
  }

  renderCurrentPage() {
    const {currentPage} = this.props
    return (
      <div className={styles.currentPage}>
        <strong>{currentPage}</strong>
      </div>
    )
  }

  renderPreviousPages() {
    const {currentPage} = this.props
    const pages = []
    for (let i = currentPage - offset; i < currentPage; i++) {
      if (i > 0) pages.push(i)
    }
    return this.renderPages(pages)
  }

  renderNextPages() {
    const {currentPage, totalPages} = this.props
    const pages = []
    for (let i = currentPage + offset; i > currentPage; i--) {
      if (i <= totalPages) pages.unshift(i)
    }
    return this.renderPages(pages)
  }

  pagination() {
    return (
      <div className={styles.pagination}>
        <div className="row center-sm">
          <div className="col-xs-12 col-sm-3 end-sm">{this.renderLeft()}</div>
          <div className="col-xs-12 col-sm-2">
            <div className="row">{this.renderPreviousPages()}</div>
          </div>
          <div className="col-xs-12 col-sm-2">{this.renderCurrentPage()}</div>
          <div className="col-xs-12 col-sm-2">
            <div className="row">{this.renderNextPages()}</div>
          </div>
          <div className="col-xs-12 col-sm-3 start-sm">{this.renderRight()}</div>
        </div>
      </div>
    )
  }

  renderLeft() {
    return (
      <div
        className={
          this.props.hasPreviousPage
            ? 'paginated-pagination-page-icon'
            : 'paginated-pagination-page-icon-disabled'
        }
        onClick={() => this.props.hasPreviousPage && this.props.search(this.props.currentPage - 1)}>
        <MdKeyboardArrowLeft size={25} />
      </div>
    )
  }
  renderRight() {
    return (
      <div
        className={
          this.props.hasNextPage
            ? 'paginated-pagination-page-icon'
            : 'paginated-pagination-page-icon-disabled'
        }
        onClick={() => this.props.hasNextPage && this.props.search(this.props.currentPage + 1)}>
        <MdKeyboardArrowRight size={25} />
      </div>
    )
  }

  state = {page: 1}
  render() {
    if (!this.props.totalPages) return null
    return (
      <div className={styles.container}>
        <div>{this.pagination()}</div>
      </div>
    )
  }
}
