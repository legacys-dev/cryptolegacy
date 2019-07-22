import React from 'react'
import styles from './styles.module.css'

const Section = ({top}) => {
  return (
    <div className={top ? styles.containerNoBorder : styles.container}>
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          <div className={styles.title} />
          <div className={styles.description} />
        </div>
        <div className="col-xs-12 col-sm-8">
          <div className={styles.children} />
        </div>
      </div>
    </div>
  )
}

export default Section
