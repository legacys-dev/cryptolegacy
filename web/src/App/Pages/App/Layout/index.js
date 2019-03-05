import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Navbar from './Navbar'

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}> {this.props.children}</div>
      </div>
    )
  }
}
