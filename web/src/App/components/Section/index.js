import React from 'react'
import styles from './styles.module.css'

const Section = ({ title, description, children, top }) => {
  return (
    <div className={top ? styles.containerNoBorder : styles.container}>
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.description}>{description}</div>
        </div>
        <div className="col-xs-12 col-sm-9">
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Section
