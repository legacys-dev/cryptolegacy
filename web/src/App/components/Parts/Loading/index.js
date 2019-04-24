import React from 'react'
import styles from './styles.css'
import Loading from 'orionsoft-parts/lib/components/Loading'

export default class LoadingComponent extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loading color="#0077ff" size={50} thickness={3} />
        </div>
      </div>
    )
  }
}
