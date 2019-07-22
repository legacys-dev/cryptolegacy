import React from 'react'
import styles from './styles.module.css'
import {Link} from 'react-router-dom'
import {MdKeyboardArrowRight} from 'react-icons/md'

const Breadcrumbs = ({past, children, right, divider}) => {
  const getPast = () => {
    if (!past) return []
    return Object.keys(past).map(path => {
      const title = past[path]
      return {
        path,
        title
      }
    })
  }

  const renderPast = () => {
    const past = getPast()
    return past.map((item, index) => {
      const isLast = index === past.length - 1
      const renderArrow = children || !isLast
      const renderLink = typeof item.title === 'string'
      return (
        <span key={item.path}>
          {renderLink ? <Link to={item.path}>{item.title}</Link> : item.title}{' '}
          {renderArrow ? (
            <span className="bread-divider">
              <MdKeyboardArrowRight />
            </span>
          ) : null}
        </span>
      )
    })
  }

  const renderRight = () => {
    if (!right) return
    return <div className={styles.right}>{right}</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.all}>
        <div className={styles.content}>
          {renderPast()}
          {children ? <span className="last">{children}</span> : null}
        </div>
        <div className={styles.right}>{renderRight()}</div>
      </div>
      {divider && <div className={styles.divider} />}
    </div>
  )
}

export default Breadcrumbs
