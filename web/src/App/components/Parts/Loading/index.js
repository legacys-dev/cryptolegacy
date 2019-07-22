import React from 'react'
import styles from './styles.module.css'
import Loading from 'orionsoft-parts/lib/components/Loading'

const LoadingComponent = ({size, thickness}) => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <Loading color="#0053b3" size={size} thickness={thickness} />
      </div>
    </div>
  )
}

LoadingComponent.defaultProps = {
  size: 50,
  thickness: 3
}

export default LoadingComponent
