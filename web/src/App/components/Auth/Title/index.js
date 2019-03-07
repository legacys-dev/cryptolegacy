import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Translate from 'App/i18n'

export default class Title extends React.Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {text} = this.props
    return (
      <div className={styles.container}>
        <Translate tr={text} />
      </div>
    )
  }
}
