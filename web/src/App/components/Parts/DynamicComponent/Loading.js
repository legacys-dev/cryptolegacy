import React from 'react'
import Loading from 'orionsoft-parts/lib/components/Loading'
import styles from './styles.module.css'

const DynamicComponent = () => {
  return (
    <div className={styles.container}>
      <Loading />
    </div>
  )
}

export default DynamicComponent
