import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Sidebar from './Sidebar'
import Container from 'orionsoft-parts/lib/components/Container'

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Container>{this.props.children}</Container>
        </div>
      </div>
    )
  }
}
