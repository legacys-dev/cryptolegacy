import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Loading from 'orionsoft-parts/lib/components/Loading'

export default class LoadingComponent extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    thickness: PropTypes.number
  }

  static defaultProps = {
    size: 50,
    thickness: 3
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loading color="#0077ff" size={this.props.size} thickness={this.props.thickness} />
        </div>
      </div>
    )
  }
}
