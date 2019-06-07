import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Translate from 'App/i18n'
import {Alert} from 'App/components/Parts/Icons'

export default class NoItemsFound extends React.Component {
  static propTypes = {
    message: PropTypes.string
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <Alert active size={30} />
        </div>
        <div className={styles.message}>
          <Translate tr={this.props.message} />
        </div>
      </div>
    )
  }
}
